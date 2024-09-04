"use client";

import { create } from "zustand";
import type { Program } from "~/server/types";

export const useProgram = create<{
  program: Program | null;
  setProgram: (program: Program) => void;
}>((set) => ({
  program: null,
  setProgram: (program) => set({ program }),
}));

export function SetProgram({ program }: { program: Program }) {
  const setProgram = useProgram.getState().setProgram;

  setProgram(program);
  return null
}
