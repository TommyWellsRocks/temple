import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { exercise_notes, exercises } from "~/server/db/schema";

import type { TitleCaseEquipment, TitleCaseMuscle } from "doNotChangeMe";
import { auth } from "~/server/auth";

export async function getExercisesForUser() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

  try {
    return {
      value: await db.query.exercises.findMany({
        where: (model, { or, eq, isNull }) =>
          or(eq(model.userId, userId), isNull(model.userId)),
        columns: { id: true, name: true },
        with: {
          notes: {
            where: (model, { eq }) => eq(model.userId, userId),
            columns: { name: true },
          },
        },
      }),
      err: null,
    };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error getting exercises from DB." };
  }
}

export async function createUserExercise(
  name: string,
  equipment: TitleCaseEquipment[] | null,
  primaryMuscle: TitleCaseMuscle | null,
  secondaryMuscles: TitleCaseMuscle[] | null,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

  try {
    const newUserCreatedExercise = await db
      .insert(exercises)
      .values({ userId, name, equipment, primaryMuscle, secondaryMuscles })
      .returning({ id: exercises.id });
    return { value: newUserCreatedExercise[0]!.id, err: null };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Error creating exercise in DB." };
  }
}

export async function editUserExercise(
  exerciseId: number,
  name: string,
  equipment: TitleCaseEquipment[] | null,
  primaryMuscle: TitleCaseMuscle | null,
  secondaryMuscles: TitleCaseMuscle[] | null,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

  try {
    await db
      .update(exercises)
      .set({ name, equipment, primaryMuscle, secondaryMuscles })
      .where(and(eq(exercises.userId, userId), eq(exercises.id, exerciseId)));
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error updating exercise in DB." };
  }

  return { err: null };
}

export async function deleteUserExercise(exerciseId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

  try {
    await db
      .delete(exercises)
      .where(and(eq(exercises.userId, userId), eq(exercises.id, exerciseId)));
  } catch (err: any) {
    console.error(err.message);
    return { err: "Error deleting exercise in DB." };
  }

  return { err: null };
}

export async function editUserExerciseName(
  exerciseId: number,
  newName: string,
  noteId?: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

  try {
    const newNote = noteId
      ? await db
          .update(exercise_notes)
          .set({ name: newName })
          .where(
            and(
              eq(exercise_notes.userId, userId),
              eq(exercise_notes.exerciseId, exerciseId),
            ),
          )
          .returning({ id: exercise_notes.id })
      : await db
          .insert(exercise_notes)
          .values({
            userId,
            exerciseId,
            name: newName,
          })
          .returning({ id: exercise_notes.id });
    return { value: newNote[0]!.id, err: null };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Failed to update exercise name in DB." };
  }
}

export async function editUserExerciseNote(
  exerciseId: number,
  noteValue: string,
  noteId?: number,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

  try {
    const newNote = noteId
      ? await db
          .update(exercise_notes)
          .set({ notes: noteValue, updatedAt: new Date() })
          .where(
            and(
              eq(exercise_notes.userId, userId),
              eq(exercise_notes.exerciseId, exerciseId),
              eq(exercise_notes.id, noteId),
            ),
          )
          .returning({ id: exercise_notes.id })
      : await db
          .insert(exercise_notes)
          .values({
            userId,
            exerciseId,
            notes: noteValue,
          })
          .returning({ id: exercise_notes.id });
    return { value: newNote[0]!.id, err: null };
  } catch (err: any) {
    console.error(err.message);
    return { value: null, err: "Failed to update exercise note in DB." };
  }
}
