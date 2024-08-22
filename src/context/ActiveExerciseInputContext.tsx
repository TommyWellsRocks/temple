"use client";

import { createContext, useContext, useState } from "react";

const ActiveInputsContext = createContext<
  | {
      loggedSetList: number[];
      setLoggedSetList: React.Dispatch<React.SetStateAction<number[]>>;
      activeSetIndex: number;
      setActiveSetIndex: React.Dispatch<React.SetStateAction<number>>;
      inputLen: number;
      setInputLen: React.Dispatch<React.SetStateAction<number>>;
    }
  | undefined
>(undefined);

export function ActiveInputsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedSetList, setLoggedSetList] = useState<number[]>([]);
  const [activeSetIndex, setActiveSetIndex] = useState<number>(0);
  const [inputLen, setInputLen] = useState<number>(0);

  return (
    <ActiveInputsContext.Provider
      value={{
        loggedSetList,
        setLoggedSetList,
        activeSetIndex,
        setActiveSetIndex,
        inputLen,
        setInputLen,
      }}
    >
      {children}
    </ActiveInputsContext.Provider>
  );
}

export function useActiveInputs() {
  return useContext(ActiveInputsContext);
}
