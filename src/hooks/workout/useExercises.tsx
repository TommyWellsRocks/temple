"use client";

import { useEffect } from "react";

import { create } from "zustand";
import { getFakeId } from "~/utils/helpers";
import {
  handleCreateUserExercise,
  handleDeleteUserExercise,
} from "~/server/actions/workout/UserExerciseActions";

import type { Exercises } from "~/server/types";
import type { TitleCaseEquipment, TitleCaseMuscle } from "doNotChangeMe";

export interface exercisesState {
  exercises: Exercises;
  setExercises: (exercises: Exercises) => void;
  createUserExercise: (
    userId: string,
    name: string,
    equipment: TitleCaseEquipment[] | null,
    primaryMuscle: TitleCaseMuscle | null,
    secondaryMuscles: TitleCaseMuscle[] | null,
  ) => void;
  deleteUserExercise: (userId: string, exerciseId: number) => void;
}

export const useExercises = create<exercisesState>((set, get) => ({
  exercises: [],
  setExercises: (exercises: Exercises) =>
    set((state) => ({ ...state, exercises })),

  createUserExercise: async (
    userId,
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
      const { id: realExerciseId } = await handleCreateUserExercise(
        userId,
        name,
        equipment,
        primaryMuscle,
        secondaryMuscles,
      );

      if (!realExerciseId) throw "No realExerciseId error";

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

  deleteUserExercise: async (userId, exerciseId) => {
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
      await handleDeleteUserExercise(userId, exerciseId);
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
