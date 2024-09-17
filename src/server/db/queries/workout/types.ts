import "server-only";

import { db } from "~/server/db";

export async function dayFromProgram() {
  return await db.query.workoutProgramDays.findFirst({
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
              equipment: true,
              primaryMuscle: true,
              secondaryMuscles: true,
            },
          },
          notes: { columns: { id: true, name: true, notes: true } },
        },
      },
    },
  });
}

export async function dayExerciseFromProgram() {
  return await db.query.workoutDayExercises.findFirst({
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
          equipment: true,
          primaryMuscle: true,
          secondaryMuscles: true,
        },
      },
      notes: { columns: { id: true, name: true, notes: true } },
    },
  });
}
