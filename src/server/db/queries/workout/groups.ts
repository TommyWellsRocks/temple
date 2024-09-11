import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import {
  workoutDayExercises,
  workoutProgramDayGroups,
  workoutProgramDays,
} from "~/server/db/schema";
import { getMyProgram } from "./program";

export async function createDayGroup(userId: string, programId: number) {
  return await db
    .insert(workoutProgramDayGroups)
    .values({ userId, programId })
    .returning({ newGroupId: workoutProgramDayGroups.id });
}

export async function addPrevDaysToNewGroup(
  userId: string,
  programId: number,
  newGroupId: number,
) {
  const program = await getMyProgram(userId, programId);

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
    const newDays = await db
      .insert(workoutProgramDays)
      .values(duplicateDaysInfo)
      .returning({ dayId: workoutProgramDays.id });

    // Map Duplicate Days To New DayId Then Insert Exercises To Day
    duplicateExercisesInfo.forEach(async (day, index) => {
      const newDayId = newDays[index]!.dayId;
      day.forEach((ex) => (ex.dayId = newDayId));

      // Add Exercises To Each Day
      await db.insert(workoutDayExercises).values(day);
    });
  }
}

export async function deleteDayGroup(
  userId: string,
  programId: number,
  groupId: number,
) {
  await db
    .delete(workoutProgramDayGroups)
    .where(
      and(
        eq(workoutProgramDayGroups.userId, userId),
        eq(workoutProgramDayGroups.programId, programId),
        eq(workoutProgramDayGroups.id, groupId),
      ),
    );
}
