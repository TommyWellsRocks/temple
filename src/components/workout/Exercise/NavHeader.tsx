import { Navigation } from "~/components/ui/Navigation";
import { EditButtonPopover } from "~/components/workout/Common/EditButtonPopover";
import { DayForm } from "~/components/workout/Program/DayForm";
import { useProgram } from "~/stores/ProgramStore";

export function NavHeader() {
  const programDay = useProgram((state) => state.day);
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
            <DayForm groupId={programDay.groupId} dayInfo={programDay} />
          }
        />
      }
    />
  );
}
