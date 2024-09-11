"use client";

import { createContext, useContext } from "react";
import type { Exercises } from "~/server/types";

const MyExercises = createContext<null | Exercises>(null);

export function MyExercisesProvider({
  children,
  exercises,
}: {
  children: React.ReactNode;
  exercises: Exercises;
}) {
  return (
    <MyExercises.Provider value={exercises}>{children}</MyExercises.Provider>
  );
}

export const useMyExercises = () => useContext(MyExercises);
