"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { handleUpdateExercise } from "~/server/components/workout/ExerciseActions";
import type { DayExercise } from "~/server/types";

const ActiveInputsContext = createContext<
  | {
      dayEx: DayExercise;
      setDayEx: React.Dispatch<React.SetStateAction<DayExercise>>;
    }
  | undefined
>(undefined);

export function ActiveInputsProvider({
  dayExercise,
  children,
}: {
  dayExercise: DayExercise;
  children: React.ReactNode;
}) {
  const [dayEx, setDayEx] = useState(dayExercise);

  useEffect(() => {
    handleUpdateExercise(dayEx);
  }, [dayEx]);

  return (
    <ActiveInputsContext.Provider
      value={{
        dayEx,
        setDayEx,
      }}
    >
      {children}
    </ActiveInputsContext.Provider>
  );
}

export function useActiveInputs() {
  return useContext(ActiveInputsContext);
}
