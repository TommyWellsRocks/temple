"use client";

import { SetProgram } from "~/hooks/workout/useProgram/actions/program";

export default function ProgramLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { programId: string };
}) {
  return (
    <>
      <SetProgram programId={Number(params.programId)} />
      {children}
    </>
  );
}
