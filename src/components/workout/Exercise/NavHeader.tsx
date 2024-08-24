import { Navigation } from "~/components/ui/Navigation";
import { EditButtonPopover } from "../EditButtonPopover";
import { DayForm } from "../DayList/DayForm";
import { ProgramDay } from "~/server/types";

export function NavHeader({ day }: { day: ProgramDay }) {
  if (!day) return;
  return (
    <Navigation
      backURL={`/workout/${day.programId}`}
      heading={`${day.name} Overview`}
      editButton={
        <EditButtonPopover
          title="Edit Exercise"
          description={`Remember to click save when you're done.`}
          formComponent={
            <DayForm
              userId={day.userId}
              programId={day.programId}
              groupId={day.groupId}
              dayInfo={day}
            />
          }
        />
      }
    />
  );
}
