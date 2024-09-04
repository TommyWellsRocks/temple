import { Navigation } from "~/components/ui/Navigation";
import { EditButtonPopover } from "~/components/workout/Common/EditButtonPopover";
import { DayForm } from "~/components/workout/Program/DayForm";
import { useProgram } from "~/stores/ProgramStore";

export function NavHeader({ dayId }: { dayId: number }) {
  const programDay = useProgram((state) =>
    state.program?.programDays.find((day) => day.id === dayId),
  );
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
