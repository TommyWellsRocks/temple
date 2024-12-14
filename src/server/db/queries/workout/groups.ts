import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import {
  workoutDayExercises,
  workoutProgramDayGroups,
  workoutProgramDays,
} from "~/server/db/schema";
import { getMyProgram } from "./program";
import { auth } from "~/server/auth";

export async function getWeekWithDays(groupId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { value: null, err: "Authentication error." };

  try {
    return {
      value: await db.query.workoutProgramDayGroups.findFirst({
        where: (model, { and, eq }) =>
          and(eq(model.userId, userId), eq(model.id, groupId)),
        columns: { id: true },
        with: {
          groupDays: {
            columns: { createdAt: false },
            with: {
              group: { columns: { id: true } },
              dayExercises: {
                columns: {
                  id: true,
                  userId: true,
                  programId: true,
                  dayId: true,
                  reps: true,
                  weight: true,
                  updatedAt: true,
                  exerciseId: true,
                  loggedSetsCount: true,
                },
                with: {
                  info: {
                    columns: {
                      id: true,
                      name: true,
                      video: true,
                      equipment: true,
                      primaryMuscle: true,
                      secondaryMuscles: true,
                    },
                  },
                  notes: { columns: { id: true, name: true, notes: true } },
                },
              },
            },
          },
        },
      }),
      err: null,
    };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error getting week from DB." };
  }
}

export async function createDayGroup(programId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { value: null, err: "Authentication error." };

  try {
    const newGroup = await db
      .insert(workoutProgramDayGroups)
      .values({ userId, programId })
      .returning({ id: workoutProgramDayGroups.id });
    return { value: newGroup[0]!.id, err: null };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error creating group in DB." };
  }
}

export async function addPrevDaysToNewGroup(
  programId: number,
  newGroupId: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { err: "Authentication error." };

  const { value: program, err: pgError } = await getMyProgram(
    userId,
    programId,
  );
  if (pgError) return { err: pgError };

  if (program?.programDays.length) {
    const sortedGroupIds: number[] = [];
    new Set(program.programDays.map((day) => day.groupId)).forEach((groupId) =>
      sortedGroupIds.push(groupId),
    );
    sortedGroupIds.sort((a, b) => a - b);
    const latestGroupId = sortedGroupIds[sortedGroupIds.length - 1];
    const latestGroupDays = program.programDays.filter(
      (day) => day.groupId === latestGroupId,
    );

    // Map Day Info And Exercises
    const duplicateDaysInfo = latestGroupDays.map((day) => ({
      userId,
      programId,
      groupId: newGroupId,
      name: day.name,
      repeatOn: day.repeatOn,
    }));

    const duplicateExercisesInfo = latestGroupDays.map((day) =>
      day.dayExercises.map((ex) => ({
        userId,
        programId,
        groupId: newGroupId,
        dayId: 0,
        exerciseId: ex.info.id,
        reps: Array(ex.reps.length).fill(0),
        weight: Array(ex.weight.length).fill(0),
      })),
    );

    // Create Days
    let newDayIds: number[];
    try {
      const newDays = await db
        .insert(workoutProgramDays)
        .values(duplicateDaysInfo)
        .returning({ dayId: workoutProgramDays.id });
      newDayIds = newDays.map((d) => d.dayId);
    } catch (err: any) {
      console.error(err.message);
      return { err: "Error adding new days in DB." };
    }

    // Map Duplicate Days To New DayId Then Insert Exercises To Day
    const proms = duplicateExercisesInfo.map((day, index) => {
      const newDayId = newDayIds[index]!;
      day.forEach((ex) => (ex.dayId = newDayId));

      // Add Exercises To Each Day
      return db.insert(workoutDayExercises).values(day);
    });

    try {
      await Promise.all(proms);
    } catch (err: any) {
      console.error(err.message);
      return { err: "Error adding exercises to new days in DB." };
    }
  }
  return { err: null };
}

export async function deleteDayGroup(programId: number, groupId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { err: "Authentication error." };

  try {
    await db
      .delete(workoutProgramDayGroups)
      .where(
        and(
          eq(workoutProgramDayGroups.userId, userId),
          eq(workoutProgramDayGroups.programId, programId),
          eq(workoutProgramDayGroups.id, groupId),
        ),
      );
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error deleting group from DB." };
  }
  return { err: null };
}
