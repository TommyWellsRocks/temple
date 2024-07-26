import "server-only";

import { db } from "../db";
import { exercise_notes, exercises } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { ExerciseObject, exerciseObjectSchema } from "../types";

export async function createExercise(exercise: ExerciseObject) {
  const validExercise = await exerciseObjectSchema.safeParseAsync(exercise);

  if (validExercise.success)
    await db.insert(exercises).values(validExercise.data);
  else return validExercise.error!.errors[0]!.message;
}

export async function deleteExercise(exerciseId: number) {
  await db.delete(exercises).where(eq(exercises.id, exerciseId));
}

export async function editExercise(
  exerciseId: number,
  newExercise: ExerciseObject,
) {
  const validExercise = await exerciseObjectSchema.safeParseAsync(newExercise);
  newExercise.updatedAt = new Date();

  if (validExercise.success)
    await db
      .update(exercises)
      .set(validExercise.data)
      .where(eq(exercises.id, exerciseId));
  else return validExercise.error.errors[0]!.message;
}

export async function getExercise(exerciseId: number) {
  return await db.query.exercises.findFirst({
    where: (model, { eq }) => eq(model.id, exerciseId),
  });
}

export async function getExercises() {
  return await db.query.exercises.findMany();
}

export async function editExerciseNote(
  userId: string,
  exerciseId: number,
  noteValue: string,
  noteId?: number,
) {
  noteId
    ? await db
        .update(exercise_notes)
        .set({ notes: noteValue })
        .where(
          and(
            eq(exercise_notes.userId, userId),
            eq(exercise_notes.exerciseId, exerciseId),
            eq(exercise_notes.id, noteId),
          ),
        )
    : await db
        .insert(exercise_notes)
        .values({
          userId,
          exerciseId,
          notes: noteValue,
          updatedAt: new Date(),
        });
}

// todo make edits only be things you want to change? Take from existing in db?
