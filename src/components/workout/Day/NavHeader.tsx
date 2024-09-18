import Loading from "~/app/loading";
import { Navigation } from "~/components/ui/Navigation";
import { EditButtonPopover } from "~/components/workout/EditButtonPopover";
import { DayForm } from "~/components/workout/forms/DayForm/DayForm";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";

export function NavHeader() {
  const programDay = useProgram((state) => state.day);
  if (!programDay) return <Loading />;
  return (
    <Navigation
      backURL={`/workout/${programDay.programId}`}
      heading={`${programDay.name} Overview`}
      editButton={
        <EditButtonPopover
          title="Edit Day"
          description={`Remember to click save when you're done.`}
          formComponent={
            <DayForm groupId={programDay.groupId} dayInfo={programDay} />
          }
        />
      }
    />
  );
}
