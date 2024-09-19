"use client";

import { setProgram } from "~/hooks/workout/useProgram/actions/programActions";

export default function ProgramLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { programId: string };
}) {
  setProgram(Number(params.programId));
  return <>{children}</>;
}
