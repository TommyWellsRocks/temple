"use client";

import { useEffect } from "react";

import { create } from "zustand";

export interface userState {
  userId: string | null;
  setUserId: (userId: string) => void;
}

export const useUser = create<userState>((set, get) => ({
  userId: null,
  setUserId: (userId) => set((state) => ({ ...state, userId })),
}));

export function SetUser({ userId }: { userId: string }) {
  const setUser = useUser.getState().setUserId;

  useEffect(() => {
    setUser(userId);
  }, [userId, setUser]);

  return null;
}
