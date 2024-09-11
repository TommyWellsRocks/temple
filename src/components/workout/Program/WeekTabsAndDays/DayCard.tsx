import { useProgram } from "~/hooks/workout/useProgram";

import { ActionCard } from "~/components/workout/ActionCard";
import { EditButtonPopover } from "~/components/workout/EditButtonPopover";
import { DayForm } from "~/components/workout/forms/DayForm/DayForm";

export function DayCard({ dayId }: { dayId: number }) {
  const day = useProgram((state) =>
    state.program?.programDays.find((day) => day.id === dayId),
  );
  if (!day) return;

  const isDone = day.startedWorkout !== null && day.endedWorkout !== null;
  // Not done and do date isn't today
  // const isFutureDay =
  //   !isDone &&
  //   day.repeatOn !== null &&
  //   !day.repeatOn.filter((repeatDay) => repeatDay === todaysDay);

  return (
    <ActionCard
      key={day.id}
      linkTo={`/workout/${day.programId}/${day.id}`}
      isDark={isDone}
      title={day.name}
      editButton={
        <EditButtonPopover
          title="Edit Program Day"
          description="Remember to click save when your done."
          formComponent={<DayForm groupId={day.groupId} dayInfo={day} />}
        />
      }
    />
  );
}
