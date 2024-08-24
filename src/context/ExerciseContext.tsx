"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { DayExercise } from "~/server/types";

const ExerciseContext = createContext<
  | {
      dayEx: DayExercise;
      setDayEx: React.Dispatch<React.SetStateAction<DayExercise>>;
    }
  | undefined
>(undefined);

export function ExerciseProvider({
  dayExercise,
  children,
}: {
  dayExercise: DayExercise;
  children: React.ReactNode;
}) {
  const [dayEx, setDayEx] = useState(dayExercise);

  return (
    <ExerciseContext.Provider
      value={{
        dayEx,
        setDayEx,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExercise() {
  return useContext(ExerciseContext);
}
