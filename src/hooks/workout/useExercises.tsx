"use client";

import { useEffect } from "react";

import { create } from "zustand";

import type { Exercises } from "~/server/types";

export interface exercisesState {
  exercises: Exercises;
  setExercises: (exercises: Exercises) => void;
}

export const useExercises = create<exercisesState>((set, get) => ({
  exercises: [],
  setExercises: (exercises: Exercises) =>
    set((state) => ({ ...state, exercises })),
}));

export function SetExercises({ exercises }: { exercises: Exercises }) {
  const setExercises = useExercises.getState().setExercises;

  useEffect(() => {
    setExercises(exercises);
  }, [exercises, setExercises]);

  return null;
}
