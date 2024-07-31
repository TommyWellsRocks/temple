import { DayExercise } from "~/server/types";
import { EditSetCount } from "./EditSetCount";
import { InputRows } from "./InputRows";
import { PreviousSessionButton } from "./PreviousSessionButton";

export function ExerciseInputs({
  lastDayExercise,
  dayExercise,
}: {
  lastDayExercise: DayExercise;
  dayExercise: {
    id: number;
    programId: number;
    dayId: number;
    userId: string;
    reps: number[];
    weight: number[];
  };
}) {
  const setCount = dayExercise.reps.length;

  return (
    <>
      {lastDayExercise ? (
        <PreviousSessionButton previousExercise={lastDayExercise} />
      ) : null}
      <div className="text-sm font-light underline underline-offset-4">
        {setCount}
        {setCount === 1 ? " Set" : " Sets"}
      </div>
      <div className="flex flex-col gap-y-5">
        <InputRows dayExercise={dayExercise} />
      </div>
      <div className="flex gap-x-5">
        <EditSetCount method="Add" dayExercise={dayExercise} />
        <EditSetCount method="Delete" dayExercise={dayExercise} />
      </div>
    </>
  );
}
