"use client";

import { SetDay } from "~/hooks/workout/useProgram/actions/day";

export default function DayLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { programId: string; dayId: string };
}) {
  return (
    <>
      <SetDay
        programId={Number(params.programId)}
        dayId={Number(params.dayId)}
      />
      {children}
    </>
  );
}
