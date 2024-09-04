"use client";

import { Navigation } from "~/components/ui/Navigation";
import { Tabs } from "~/components/ui/tabs";
import { EditButtonPopover } from "~/components/workout/Common/EditButtonPopover";
import { GroupDays, GroupsInfo } from "~/components/workout/Program/DayList";
import { ProgramForm } from "~/components/workout/Programs/ProgramForm";
import { useProgram } from "~/stores/ProgramStore";

// * DAYS PAGE

export default function Days() {
  const [programName, programGroups, userId] = useProgram((state) => [
    state.program?.name,
    state.program?.groups,
    state.program?.userId,
  ]);
  const program = useProgram((state) => state.program);
  if (!programName || !programGroups || !userId) return;

  const lastGroupId = String(programGroups[programGroups.length - 1]!.id);

  return (
    <>
      <Navigation
        backURL="/workout"
        heading={programName}
        editButton={
          <EditButtonPopover
            title="Edit Exercise"
            description={`Remember to click save when you're done.`}
            formComponent={<ProgramForm userId={userId} programInfo={program!} />}
          />
        }
      />

      <section>
        <Tabs defaultValue={lastGroupId}>
          <GroupsInfo />

          <GroupDays />
        </Tabs>
      </section>
    </>
  );
}
