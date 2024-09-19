"use server";

import {
  createWorkoutProgram,
  deleteWorkoutProgram,
  editWorkoutProgram,
  getMyProgram,
} from "~/server/db/queries/workout/program";

export async function handleCreateProgram(
  userId: string,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  return await createWorkoutProgram(userId, name, startDate, endDate);
}

export async function handleGetProgram(userId: string, programId: number) {
  return await getMyProgram(userId, programId);
}

export async function handleUpdateProgram(
  userId: string,
  programId: number,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  await editWorkoutProgram(userId, programId, name, startDate, endDate);
}

export async function handleDeleteProgram(userId: string, programId: number) {
  await deleteWorkoutProgram(userId, programId);
}
