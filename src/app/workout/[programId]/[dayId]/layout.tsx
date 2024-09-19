"use client";

import { setDay } from "~/hooks/workout/useProgram/actions/day";

export default function DayLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { dayId: string };
}) {
  setDay(Number(params.dayId));
  return <>{children}</>;
}
