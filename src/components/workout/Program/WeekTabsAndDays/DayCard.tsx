import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import Loading from "~/app/loading";
import { ActionCard } from "~/components/workout/ActionCard";
import { EditButton } from "../../EditDayButton";

export function DayCard({ dayId }: { dayId: number }) {
  const day = useProgram((state) =>
    state.program?.programDays.find((day) => day.id === dayId),
  );
  if (!day) return <Loading />;

  const isDone = day.startedWorkout !== null && day.endedWorkout !== null;
  // Not done and do date isn't today
  // const isFutureDay =
  //   !isDone &&
  //   day.repeatOn !== null &&
  //   !day.repeatOn.filter((repeatDay) => repeatDay === todaysDay);

  return (
    <ActionCard
      id="day"
      key={day.id}
      linkTo={`/workout/${day.programId}/${day.id}`}
      isDark={isDone}
      title={day.name}
      editButton={<EditButton day={day} />}
    />
  );
}
