"use client";

import { Navigation } from "~/components/ui/Navigation";
import { Tabs } from "~/components/ui/tabs";
import { GroupDays, GroupsInfo } from "~/components/workout/Program/DayList";
import { useProgram } from "~/stores/ProgramStore";

// * DAYS PAGE

export default function Days() {
  const programName = useProgram((state) => state.program?.name);
  const programGroups = useProgram((state) => state.program?.groups);
  if (!programName || !programGroups) return;

  const lastGroupId = String(programGroups[programGroups.length - 1]!.id);

  return (
    <>
      <Navigation backURL="/workout" heading={programName} />

      <section>
        <Tabs defaultValue={lastGroupId}>
          <GroupsInfo />

          <GroupDays />
        </Tabs>
      </section>
    </>
  );
}
