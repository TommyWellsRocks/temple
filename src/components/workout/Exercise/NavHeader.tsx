import { Navigation } from "~/components/ui/Navigation";
import { EditButtonPopover } from "~/components/workout/Common/EditButtonPopover";
import { DayForm } from "~/components/workout/Program/DayForm";
import type { ProgramDay } from "~/server/types";

export function NavHeader({ programDay }: { programDay: ProgramDay }) {
  if (!programDay) return;
  return (
    <Navigation
      backURL={`/workout/${programDay.programId}`}
      heading={`${programDay.name} Overview`}
      editButton={
        <EditButtonPopover
          title="Edit Exercise"
          description={`Remember to click save when you're done.`}
          formComponent={
            <DayForm
              userId={programDay.userId}
              programId={programDay.programId}
              groupId={programDay.groupId}
              dayInfo={programDay}
            />
          }
        />
      }
    />
  );
}
