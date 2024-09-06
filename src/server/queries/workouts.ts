import "server-only";

import { db } from "~/server/db";
import {
  calculateExerciseVolume,
  calculateSessionVolume,
  getWeeksEndDates,
  getDayOfWeek,
  getYearsEndDates,
  calculateMonthActiveDays,
} from "./utils/workoutVolume";
import type { DayExercise } from "~/server/types";
import {
  users,
  workoutDayExercises,
  workoutProgramDayGroups,
  workoutProgramDays,
  workoutPrograms,
} from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

// * Redirect
export async function getWorkoutRedirect(userId: string) {
  const shouldRedirect = await db.query.users.findFirst({
    columns: { redirectOnLoadWorkout: true, lastWorkoutRedirect: true },
    where: (model, { eq }) => eq(model.id, userId),
  });
  // Stop If Shouldn't Redirect
  if (!shouldRedirect?.redirectOnLoadWorkout) return;

  const today = new Date();

  // Stop If Redirected Already Today
  if (shouldRedirect.lastWorkoutRedirect) {
    const lastRedirect = new Date(shouldRedirect.lastWorkoutRedirect);
    today.setHours(0, 0, 0, 0);
    lastRedirect.setHours(0, 0, 0, 0);
    if (today.getDate() === lastRedirect.getDate()) return;
  }

  // Stop If No Scheduled Program
  const activeProgram = await db.query.workoutPrograms.findFirst({
    columns: { id: true },
    where: (model, { and, eq, lte, gte }) =>
      and(
        eq(model.userId, userId),
        lte(model.startDate, today),
        gte(model.endDate, today),
      ),
    with: {
      groups: {
        columns: {},
        with: {
          groupDays: {
            columns: { repeatOn: true, id: true },
            with: { dayExercises: { columns: { reps: true } } },
          },
        },
      },
    },
  });
  if (!activeProgram) return;

  // Will Return Redirect, So Input Into DB
  await db
    .update(users)
    .set({ lastWorkoutRedirect: new Date() })
    .where(eq(users.id, userId));

  // Stop If No Scheduled Day
  const todayDay = today.getDay();
  const finalGroupScheduledDay = activeProgram.groups[
    activeProgram.groups.length - 1
  ]!.groupDays.find((day) => day.repeatOn?.includes(todayDay));
  if (!finalGroupScheduledDay) return `workout/${activeProgram.id}`;

  // If Complete, Start New Group And Return Day
  const dayComplete = finalGroupScheduledDay.dayExercises.find(
    (ex) => !ex.reps.includes(0),
  );
  if (dayComplete) {
    const newGroupId = (await createDayGroup(userId, activeProgram.id))[0]!
      .newGroupId;
    const groupDays = (await db.query.workoutProgramDayGroups.findFirst({
      columns: {},
      where: (model, { eq }) => eq(model.id, newGroupId),
      with: {
        groupDays: { columns: { id: true, repeatOn: true } },
      },
    }))!.groupDays;
    const newGroupDayId = groupDays.find((day) =>
      day.repeatOn?.includes(todayDay),
    )!.id;
    return `/workout/${activeProgram.id}/${newGroupDayId}`;
  }

  // Return Day
  return `/workout/${activeProgram.id}/${finalGroupScheduledDay.id}`;
}

// * Program
export async function getMyPrograms(userId: string) {
  return await db.query.workoutPrograms.findMany({
    where: (model, { eq }) => eq(model.userId, userId),
    orderBy: (model, { desc }) => desc(model.createdAt),
    columns: { createdAt: false, updatedAt: false },
    with: {
      groups: {
        columns: { id: true },
        with: {
          groupDays: {
            columns: { name: true },
            with: { dayExercises: { columns: { reps: true } } },
          },
        },
      },
    },
  });
}

export async function createWorkoutProgram(
  userId: string,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  const newProgramId = await db
    .insert(workoutPrograms)
    .values({
      userId,
      name,
      startDate,
      endDate,
    })
    .returning({ id: workoutPrograms.id });
  await createDayGroup(userId, newProgramId[0]!.id);
}

export async function editWorkoutProgram(
  userId: string,
  programId: number,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  await db
    .update(workoutPrograms)
    .set({ name, startDate, endDate, updatedAt: new Date() })
    .where(
      and(
        eq(workoutPrograms.userId, userId),
        eq(workoutPrograms.id, programId),
      ),
    );
}

export async function deleteWorkoutProgram(userId: string, programId: number) {
  await db
    .delete(workoutPrograms)
    .where(
      and(
        eq(workoutPrograms.userId, userId),
        eq(workoutPrograms.id, programId),
      ),
    );
}

// * Program Days
export async function getMyProgram(userId: string, programId: number) {
  const program = await db.query.workoutPrograms.findFirst({
    where: (model, { and, eq }) =>
      and(eq(model.userId, userId), eq(model.id, programId)),
    with: {
      programDays: {
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
              day: { columns: { startedWorkout: true, endedWorkout: true } },
              info: {
                columns: {
                  id: true,
                  name: true,
                  video: true,
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
    columns: {
      name: true,
      userId: true,
      id: true,
      startDate: true,
      endDate: true,
    },
  });
  return program;
}

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

export async function createProgramDay(
  userId: string,
  programId: number,
  groupId: number,
  name: string,
  repeatOn: number[] | null,
) {
  await db
    .insert(workoutProgramDays)
    .values({ userId, programId, groupId, name, repeatOn });
}

export async function editProgramDay(
  userId: string,
  programId: number,
  dayId: number,
  name: string,
  repeatOn: number[] | null,
) {
  await db
    .update(workoutProgramDays)
    .set({ name, repeatOn, updatedAt: new Date() })
    .where(
      and(
        eq(workoutProgramDays.userId, userId),
        eq(workoutProgramDays.programId, programId),
        eq(workoutProgramDays.id, dayId),
      ),
    );
}

export async function deleteProgramDay(
  userId: string,
  programId: number,
  dayId: number,
) {
  await db
    .delete(workoutProgramDays)
    .where(
      and(
        eq(workoutProgramDays.userId, userId),
        eq(workoutProgramDays.programId, programId),
        eq(workoutProgramDays.id, dayId),
      ),
    );
}

// * Program Day
export async function getMyProgramDay(
  userId: string,
  programId: number,
  dayId: number,
) {
  return await db.query.workoutProgramDays.findFirst({
    where: (model, { and, eq }) =>
      and(
        eq(model.userId, userId),
        eq(model.programId, programId),
        eq(model.id, dayId),
      ),
    columns: { createdAt: false, updatedAt: false },
    with: {
      dayExercises: {
        columns: { id: true, reps: true, weight: true },
        with: {
          info: {
            columns: {
              id: true,
              name: true,
              primaryMuscle: true,
              secondaryMuscles: true,
            },
          },
          notes: { columns: { id: true, name: true } },
        },
      },
    },
  });
}

// * Chart Information
export async function getMyYearDaysActiveAnalytics(userId: string) {
  const [lastYearStart, lastYearEnd, thisYearStart, thisYearEnd] =
    getYearsEndDates();
  const yearSessionItems = async (firstDay: Date, lastDay: Date) => {
    return await db.query.workoutDayExercises.findMany({
      where: (model, { and, eq, ne, between }) =>
        and(
          eq(model.userId, userId),
          ne(model.updatedAt, model.createdAt),
          between(model.updatedAt, firstDay, lastDay),
        ),
      orderBy: (model, { asc }) => asc(model.updatedAt),
      columns: { dayId: true, updatedAt: true },
    });
  };

  const lastYearSessionItems = await yearSessionItems(
    lastYearStart!,
    lastYearEnd!,
  );
  const thisYearSessionItems = await yearSessionItems(
    thisYearStart!,
    thisYearEnd!,
  );
  const lastYearActivity = calculateMonthActiveDays(lastYearSessionItems);
  const thisYearActivity = calculateMonthActiveDays(thisYearSessionItems);

  return [lastYearActivity, thisYearActivity];
}

export async function getMyWeekAnalytics(userId: string) {
  // Go through all exercises between dates, and calculate the day's total session volume.
  const weekVolume = async (firstDay: Date, lastDay: Date) => {
    const weekExercises = await db.query.workoutDayExercises.findMany({
      where: (model, { and, eq, between }) =>
        and(
          eq(model.userId, userId),
          between(model.updatedAt, firstDay, lastDay),
        ),
      columns: { dayId: true, updatedAt: true },
      with: {
        day: {
          with: { dayExercises: { columns: { reps: true, weight: true } } },
        },
      },
    });

    const dayIds = new Set<number>();
    const weekVolume = Array(7).fill(0);
    weekExercises.forEach((exercise) => {
      if (!dayIds.has(exercise.dayId)) {
        dayIds.add(exercise.dayId);
        const sessionVolume = calculateSessionVolume(exercise.day.dayExercises);
        const dayOfWeek = getDayOfWeek(exercise.updatedAt);
        weekVolume[dayOfWeek]! += sessionVolume;
      }
    });
    return weekVolume as number[];
  };

  const [lastSun, lastSat, thisSun, thisSat] = getWeeksEndDates();
  const lastWeekVolume = await weekVolume(lastSun!, lastSat!);
  const thisWeekVolume = await weekVolume(thisSun!, thisSat!);

  return [lastWeekVolume, thisWeekVolume];
}

export async function getMyExerciseAnalytics(
  currentDayExercise: DayExercise,
  lastDayExercise: DayExercise,
) {
  const lastSession = lastDayExercise
    ? calculateExerciseVolume(lastDayExercise)
    : undefined;
  const currentSession = calculateExerciseVolume(currentDayExercise);

  return [lastSession, currentSession];
}

// * Day Exercise
export async function getMyDayExercise(
  userId: string,
  programId: number,
  dayId: number,
  dayExerciseId: number,
) {
  return await db.query.workoutDayExercises.findFirst({
    where: (model, { and, eq }) =>
      and(
        eq(model.userId, userId),
        eq(model.programId, programId),
        eq(model.dayId, dayId),
        eq(model.id, dayExerciseId),
      ),
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
      day: { columns: { startedWorkout: true, endedWorkout: true } },
      info: {
        columns: {
          id: true,
          name: true,
          video: true,
        },
      },
      notes: { columns: { id: true, name: true, notes: true } },
    },
  });
}

export async function getLastSessionExercise(dayExercise: DayExercise) {
  return await db.query.workoutDayExercises.findFirst({
    where: (model, { and, eq, ne, lt }) =>
      and(
        eq(model.userId, dayExercise!.userId),
        eq(model.exerciseId, dayExercise!.exerciseId),
        ne(model.dayId, dayExercise!.dayId),
        lt(model.updatedAt, dayExercise!.updatedAt),
        ne(model.reps, [0, 0, 0, 0]), // Last Not-Default
        // not(sql`0 = ANY(${model.reps})`), // Last Fully completed
      ),
    orderBy: (model, { desc }) => desc(model.updatedAt),
    with: { info: true, notes: true },
  });
}

export async function addDayExercise(
  userId: string,
  programId: number,
  groupId: number,
  dayId: number,
  exerciseId: number,
) {
  const last = await db.query.workoutDayExercises.findFirst({
    columns: { reps: true, weight: true },
    where: (model, { and, eq }) =>
      and(eq(model.userId, userId), eq(model.exerciseId, exerciseId)),
    orderBy: (model, { desc }) => desc(model.updatedAt),
  });

  await db.insert(workoutDayExercises).values({
    userId,
    programId,
    groupId,
    dayId,
    exerciseId,
    reps: last?.reps ?? [0, 0, 0, 0],
    weight: last?.weight ?? [0, 0, 0, 0],
  });
}

export async function deleteDayExercise(userId: string, dayExerciseId: number) {
  await db
    .delete(workoutDayExercises)
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}

export async function updateDayExerciseInput(
  dayExerciseId: number,
  userId: string,
  reps: number[],
  weight: number[],
) {
  await db
    .update(workoutDayExercises)
    .set({
      reps,
      weight,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}

export async function updateDayExerciseSets(
  dayExerciseId: number,
  userId: string,
  reps: number[],
  weight: number[],
  loggedSetsCount: number,
) {
  await db
    .update(workoutDayExercises)
    .set({
      reps,
      weight,
      updatedAt: new Date(),
      loggedSetsCount,
    })
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}

export async function updateLoggedSets(
  dayExerciseId: number,
  userId: string,
  loggedSetsCount: number,
) {
  await db
    .update(workoutDayExercises)
    .set({ loggedSetsCount: loggedSetsCount, updatedAt: new Date() })
    .where(
      and(
        eq(workoutDayExercises.userId, userId),
        eq(workoutDayExercises.id, dayExerciseId),
      ),
    );
}

export async function startWorkout(userId: string, dayId: number) {
  await db
    .update(workoutProgramDays)
    .set({ startedWorkout: new Date() })
    .where(
      and(
        eq(workoutProgramDays.userId, userId),
        eq(workoutProgramDays.id, dayId),
      ),
    );
}

export async function endWorkout(userId: string, dayId: number) {
  await db
    .update(workoutProgramDays)
    .set({ endedWorkout: new Date() })
    .where(
      and(
        eq(workoutProgramDays.userId, userId),
        eq(workoutProgramDays.id, dayId),
      ),
    );
}
