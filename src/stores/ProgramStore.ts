import { create } from "zustand";
import { getMyProgram } from "~/server/queries/workouts";
import type { Program } from "~/server/types";

export const useProgram = create<{
  program: Program | null;
  setProgram: (userId: string, programId: number) => Promise<void>;
}>((set) => ({
  program: null,
  setProgram: async (userId: string, programId: number) => {
    const program = await getMyProgram(userId, programId);
    set({ program });
  },
}));
