"use client";

import { useEffect } from "react";

import { create } from "zustand";

import type { ExerciseHistory } from "~/server/types";

export interface exerciseHistoryState {
  exerciseHistory: ExerciseHistory | null;
  setExerciseHistory: (exerciseHistory: ExerciseHistory) => void;
}

export const useExerciseHistory = create<exerciseHistoryState>((set) => ({
  exerciseHistory: null,
  setExerciseHistory: (exerciseHistory) =>
    set((state) => ({ ...state, exerciseHistory })),
}));

export function SetExerciseHistory({
  exerciseHistory,
}: {
  exerciseHistory: ExerciseHistory;
}) {
  const setHistory = useExerciseHistory.getState().setExerciseHistory;

  useEffect(() => {
    setHistory(exerciseHistory);
  }, [exerciseHistory, setHistory]);

  return null;
}
