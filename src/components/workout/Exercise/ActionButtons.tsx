"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft, CheckCheck } from "lucide-react";
import { useExercise } from "~/context/ExerciseContext";

export function ActionButtons() {
  const { dayEx, setDayEx } = useExercise()!;
  if (!dayEx) return;

  const dayNotStarted =
    dayEx.day.startedWorkout === null && dayEx.day.endedWorkout === null;
  if (dayNotStarted) return;

  const dayIsDone =
    dayEx.day.startedWorkout !== null && dayEx.day.endedWorkout !== null;
  if (dayIsDone) return;

  const allLogged = dayEx.loggedSetsCount === dayEx.reps.length;

  return (
    <div className="sticky bottom-5 flex justify-between gap-x-4">
      {allLogged ? (
        <Link
          href={`/workout/${dayEx.programId}/${dayEx.dayId}`}
          className="mx-auto"
        >
          <Button className="flex gap-1 bg-white text-black">
            <ArrowLeft width={15} /> DONE
          </Button>
        </Link>
      ) : (
        <>
          <div className="w-[42px]" />
          <Button
            className="w-full"
            onClick={() => {
              setDayEx((prevDayEx) => {
                if (!prevDayEx) return;
                const newDayEx = { ...prevDayEx };
                newDayEx.loggedSetsCount = newDayEx.loggedSetsCount + 1;
                return newDayEx;
              });
            }}
          >
            Log Set
          </Button>
          <Button
            className="rounded-full px-2"
            variant={"outline"}
            onClick={() => {
              setDayEx((prevDayEx) => {
                if (!prevDayEx) return;
                const newDayEx = { ...prevDayEx };
                newDayEx.loggedSetsCount = newDayEx.reps?.length;
                return newDayEx;
              });
            }}
          >
            <CheckCheck />
          </Button>
        </>
      )}
    </div>
  );
}
