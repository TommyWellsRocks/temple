"use server";

import { revalidatePath } from "next/cache";
import {
  createProgramDay,
  editProgramDay,
  deleteProgramDay,
} from "~/server/queries/workouts";

export async function handleCreateDay(
  userId: string,
  programId: number,
  name: string,
  repeatOn: number[] | undefined,
) {
  await createProgramDay(
    userId,
    programId,
    name,
    repeatOn || null,
  );
  revalidatePath("/workout");
}

export async function handleEditProgramDay(
  userId: string,
  programId: number,
  dayId: number,
  name: string,
  repeatOn: number[] | undefined,
) {
  await editProgramDay(
    userId,
    programId,
    dayId,
    name,
    repeatOn || null,
  );
  revalidatePath("/workout");
}

export async function handleDeleteProgramDay(
  userId: string,
  programId: number,
  dayId: number,
) {
  await deleteProgramDay(userId, programId, dayId);
  revalidatePath("/workout");
}
