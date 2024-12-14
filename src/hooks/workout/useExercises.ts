"use client";

import { useEffect } from "react";

import { create } from "zustand";
import { getFakeId } from "~/utils/helpers";
import {
  handleCreateUserExercise,
  handleDeleteUserExercise,
  handleEditUserExercise,
} from "~/server/actions/workout/UserExerciseActions";

import type { Exercises } from "~/server/types";
import type { TitleCaseEquipment, TitleCaseMuscle } from "doNotChangeMe";

export interface exercisesState {
  exercises: Exercises;
  setExercises: (exercises: Exercises) => void;
  createUserExercise: (
    name: string,
    equipment: TitleCaseEquipment[] | null,
    primaryMuscle: TitleCaseMuscle | null,
    secondaryMuscles: TitleCaseMuscle[] | null,
  ) => void;
  updateUserExercise: (
    exerciseId: number,
    name: string,
    equipment: TitleCaseEquipment[] | null,
    primaryMuscle: TitleCaseMuscle | null,
    secondaryMuscles: TitleCaseMuscle[] | null,
  ) => void;
  deleteUserExercise: (exerciseId: number) => void;
}

export const useExercises = create<exercisesState>((set, get) => ({
  exercises: [],
  setExercises: (exercises: Exercises) =>
    set((state) => ({ ...state, exercises })),

  createUserExercise: async (
    name,
    equipment,
    primaryMuscle,
    secondaryMuscles,
  ) => {
    // Failsafe
    const fallbackExercises = get().exercises;

    // Optimistic Update
    const existingIds = fallbackExercises.map((ex) => ex.id);
    const fakeId = getFakeId(existingIds);

    const optimisticExercise = {
      id: fakeId,
      name: name,
      notes: [
        {
          name: null,
        },
      ],
    };
    const optimisticExercises = [...fallbackExercises, optimisticExercise];

    set((state) => ({
      ...state,
      exercises: optimisticExercises,
    }));

    // Actual Update
    try {
      const { value: realExerciseId, err } = await handleCreateUserExercise(
        name,
        equipment,
        primaryMuscle,
        secondaryMuscles,
      );

      if (!realExerciseId || err) throw err ? err : "No realExerciseId error";

      const actualExercise = { ...optimisticExercise, id: realExerciseId };
      const actualExercises = optimisticExercises.map((exercise) =>
        exercise.id === fakeId ? actualExercise : exercise,
      );

      set((state) => ({
        ...state,
        exercises: actualExercises,
      }));
    } catch (error) {
      // Else Fallback Update
      console.error(error);
      set((state) => ({
        ...state,
        exercises: fallbackExercises,
      }));
    }
  },

  updateUserExercise: async (
    exerciseId,
    name,
    equipment,
    primaryMuscle,
    secondaryMuscles,
  ) => {
    // Failsafe
    const fallbackExercises = get().exercises;
    const fallbackExercise = fallbackExercises.find(
      (ex) => ex.id === exerciseId,
    );
    if (!fallbackExercise) return;

    // Optimistic Update
    const optimisticExercise = {
      ...fallbackExercise,
      notes: [
        {
          name,
        },
      ],
    };
    const optimisticExercises = fallbackExercises.map((ex) =>
      ex.id === exerciseId ? optimisticExercise : ex,
    );

    set((state) => ({
      ...state,
      exercises: optimisticExercises,
    }));

    // Actual Update
    try {
      const { err } = await handleEditUserExercise(
        exerciseId,
        name,
        equipment,
        primaryMuscle,
        secondaryMuscles,
      );
      if (err) throw err;
    } catch (error) {
      // Else Fallback Update
      console.error(error);
      set((state) => ({
        ...state,
        exercises: fallbackExercises,
      }));
    }
  },

  deleteUserExercise: async (exerciseId) => {
    // Failsafe
    const fallbackExercises = get().exercises;

    // Optimistic Update
    const optimisticExercises = [...fallbackExercises];
    const badEggIndex = optimisticExercises.findIndex(
      (ex) => ex.id === exerciseId,
    );
    optimisticExercises.splice(badEggIndex, 1);

    set((state) => ({
      ...state,
      exercises: optimisticExercises,
    }));

    // Actual Update
    try {
      const { err } = await handleDeleteUserExercise(exerciseId);
      if (err) throw err;
    } catch (error) {
      // Else Fallback Update
      console.error(error);
      set((state) => ({
        ...state,
        exercises: fallbackExercises,
      }));
    }
  },
}));

export function SetExercises({ exercises }: { exercises: Exercises }) {
  const setExercises = useExercises.getState().setExercises;

  useEffect(() => {
    setExercises(exercises);
  }, [exercises, setExercises]);

  return null;
}
