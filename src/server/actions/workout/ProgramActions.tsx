"use server";

import { revalidatePath } from "next/cache";
import {
  createProgramDay,
  editProgramDay,
  deleteProgramDay,
  createDayGroup,
  deleteDayGroup,
  addPrevDaysToNewGroup,
} from "~/server/queries/workouts";

export async function handleCreateDay(
  userId: string,
  programId: number,
  groupId: number,
  name: string,
  repeatOn: number[] | null,
) {
  await createProgramDay(userId, programId, groupId, name, repeatOn);
}

export async function handleEditProgramDay(
  userId: string,
  programId: number,
  dayId: number,
  name: string,
  repeatOn: number[] | null,
) {
  await editProgramDay(userId, programId, dayId, name, repeatOn);
}

export async function handleDeleteProgramDay(
  userId: string,
  programId: number,
  dayId: number,
) {
  await deleteProgramDay(userId, programId, dayId);
  revalidatePath("/workout");
}

export async function handleCreateDayGroup(userId: string, programId: number) {
  const newGroupId = await createDayGroup(userId, programId);
  await addPrevDaysToNewGroup(userId, programId, newGroupId[0]!.newGroupId);
  revalidatePath("/workout");
}

export async function handleDeleteDayGroup(
  userId: string,
  programId: number,
  groupId: number,
) {
  await deleteDayGroup(userId, programId, groupId);
  revalidatePath("/workout");
}
