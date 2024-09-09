"use client"

import { createContext, useContext } from "react";
import type { ExerciseHistory } from "~/server/types";

const ExHistory = createContext<null | ExerciseHistory>(null);

export function ExHistoryProvider({
  children,
  exHistory,
}: {
  children: React.ReactNode;
  exHistory: ExerciseHistory;
}) {
  return <ExHistory.Provider value={exHistory}>{children}</ExHistory.Provider>;
}

export const useExHistory = () => useContext(ExHistory);
