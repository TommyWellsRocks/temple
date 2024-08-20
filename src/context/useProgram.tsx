"use server";

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { getMyProgram } from "~/server/queries/workouts";

export const useProgramClient = cache(
  async (userId: string, programId: number) =>
    await getMyProgram(userId, programId),
);
export const useProgram = unstable_cache(
  async (userId: string, programId: number) =>
    await getMyProgram(userId, programId),
);
