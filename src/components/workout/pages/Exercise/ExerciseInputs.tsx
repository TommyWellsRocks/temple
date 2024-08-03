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
    <div className="flex flex-col items-center justify-center gap-y-5">
      <div className="grid w-full grid-cols-3 items-center">
        <div />

        <div className="justify-self-center text-sm font-light underline underline-offset-4">
          {setCount}
          {setCount === 1 ? " Set" : " Sets"}
        </div>

        <div className="justify-self-end">
          {lastDayExercise ? (
            <PreviousSessionButton previousExercise={lastDayExercise} />
          ) : null}
        </div>
      </div>

      <div>
        <InputRows dayExercise={dayExercise} />
      </div>
      <div className="mb-10 flex gap-x-10">
        <EditSetCount method="Add" dayExercise={dayExercise} />
        <EditSetCount method="Delete" dayExercise={dayExercise} />
      </div>
    </div>
  );
}
