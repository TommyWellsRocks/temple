import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { DayCard } from "./DayCard";

export function DaysList({ groupId }: { groupId: number }) {
  const groupDays = useProgram((state) =>
    state.program?.programDays.filter((day) => day.groupId === groupId),
  );
  if (!groupDays) return;

  return (
    <>
      {groupDays
        .sort((a, b) => {
          const sumRepeatOn = (days: number[] | null) =>
            days?.reduce((acc, day) => acc + day, 0) || 0;
          return (
            sumRepeatOn(a.repeatOn) - sumRepeatOn(b.repeatOn) || a.id - b.id
          );
        })
        .map((day) => (
          <DayCard key={day.id} dayId={day.id} />
        ))}
    </>
  );
}
