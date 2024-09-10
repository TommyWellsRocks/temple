"use client";

import { createContext, useContext } from "react";

const UserId = createContext<null | string>(null);

export function UserIdProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  return <UserId.Provider value={userId}>{children}</UserId.Provider>;
}

export const useUserId = () => useContext(UserId);
