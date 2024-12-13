import "server-only";

import { db } from "~/server/db";
import { and, eq } from "drizzle-orm";
import { exercise_notes, exercises } from "~/server/db/schema";

import type { TitleCaseEquipment, TitleCaseMuscle } from "doNotChangeMe";

export async function getExercisesForUser(userId: string) {
  return await db.query.exercises.findMany({
    where: (model, { or, eq, isNull }) =>
      or(eq(model.userId, userId), isNull(model.userId)),
    columns: { id: true, name: true },
    with: {
      notes: {
        where: (model, { eq }) => eq(model.userId, userId),
        columns: { name: true },
      },
    },
  });
}

export async function createUserExercise(
  userId: string,
  name: string,
  equipment: TitleCaseEquipment[] | null,
  primaryMuscle: TitleCaseMuscle | null,
  secondaryMuscles: TitleCaseMuscle[] | null,
) {
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
  userId: string,
  exerciseId: number,
  name: string,
  equipment: TitleCaseEquipment[] | null,
  primaryMuscle: TitleCaseMuscle | null,
  secondaryMuscles: TitleCaseMuscle[] | null,
) {
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

export async function deleteUserExercise(userId: string, exerciseId: number) {
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
  userId: string,
  exerciseId: number,
  newName: string,
  noteId?: number,
) {
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
  userId: string,
  exerciseId: number,
  noteValue: string,
  noteId?: number,
) {
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
