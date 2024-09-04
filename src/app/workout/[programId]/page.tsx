"use client";

import { useRouter } from "next/navigation";
import { Navigation } from "~/components/ui/Navigation";
import { DayList } from "~/components/workout/Program/DayList";
import { useProgram } from "~/stores/ProgramStore";

// * DAYS PAGE

export default function Days() {
  const router = useRouter();
  const program = useProgram((state) => state.program);
  if (!program) return router.push("/workout");

  return (
    <>
      <Navigation backURL="/workout" heading={program.name} />

      <DayList
        userId={program.userId}
        programId={program.id}
        program={program}
      />
    </>
  );
}
