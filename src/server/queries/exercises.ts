import "server-only";

import { db } from "~/server/db";
import { exercise_notes } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export async function getExercises() {
  return await db.query.exercises.findMany({
    columns: { name: true, id: true },
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
        .set({ notes: noteValue })
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
        updatedAt: new Date(),
      });
}
