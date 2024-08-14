import "server-only";

import { db } from "~/server/db";
import { exercise_notes } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export async function getExercises(userId: string) {
  return await db.query.exercises.findMany({
    columns: { id: true, name: true },
    with: {
      notes: {
        columns: { name: true },
        where: (model, { eq }) => eq(model.userId, userId),
      },
    },
  });
}

export async function editUserExerciseName(
  userId: string,
  exerciseId: number,
  newName: string,
  noteId?: number,
) {
  noteId
    ? await db
        .update(exercise_notes)
        .set({ name: newName })
        .where(
          and(
            eq(exercise_notes.userId, userId),
            eq(exercise_notes.exerciseId, exerciseId),
          ),
        )
    : await db.insert(exercise_notes).values({
        userId,
        exerciseId,
        name: newName,
      });
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
        .set({ notes: noteValue, updatedAt: new Date() })
        .where(
          and(
            eq(exercise_notes.userId, userId),
            eq(exercise_notes.exerciseId, exerciseId),
            eq(exercise_notes.id, noteId),
          ),
        )
    : await db.insert(exercise_notes).values({
        userId,
        exerciseId,
        notes: noteValue,
      });
}
