"use client";

import { createContext, useContext } from "react";
import type { WorkoutPrograms } from "~/server/types";

const MyPrograms = createContext<null | WorkoutPrograms>(null);

export function MyProgramsProvider({
  children,
  workoutPrograms,
}: {
  children: React.ReactNode;
  workoutPrograms: WorkoutPrograms;
}) {
  return (
    <MyPrograms.Provider value={workoutPrograms}>
      {children}
    </MyPrograms.Provider>
  );
}

export const useMyPrograms = () => useContext(MyPrograms);
