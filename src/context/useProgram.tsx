"use server";

import { getMyProgram } from "~/server/queries/workouts";

export async function useProgramClient(userId: string, programId: number) {
  return await getMyProgram(userId, programId)
}

export async function useProgram(userId: string, programId: number) {
  return await getMyProgram(userId, programId)
}
