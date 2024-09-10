"use client";

import { HeaderNav } from "./_components/HeaderNav";
import { Tabs } from "~/components/ui/tabs";
import { GroupDays, GroupsInfo } from "./_components/DayList";
import { useProgram } from "~/hooks/workout/useProgram";

// * DAYS PAGE

export default function Days() {
  const programGroups = useProgram((state) => state.programGroups);
  if (!programGroups) return;

  const lastGroupId = String(programGroups[programGroups.length - 1]!.id);

  return (
    <>
      <HeaderNav />

      <section>
        <Tabs defaultValue={lastGroupId}>
          <GroupsInfo />

          <GroupDays />
        </Tabs>
      </section>
    </>
  );
}
