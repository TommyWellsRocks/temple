"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft, CheckCheck } from "lucide-react";
import { useProgram } from "~/hooks/workout/useProgram";

export function ActionButtons() {
  const [dayEx, startedWorkout, endedWorkout] = useProgram((state) => [
    state.dayExercise,
    state.day?.startedWorkout,
    state.day?.endedWorkout,
  ]);
  const setLoggedSets = useProgram().setDayExerciseLoggedSet;

  if (!dayEx || startedWorkout === undefined || endedWorkout === undefined)
    return;

  const dayNotStarted = startedWorkout === null && endedWorkout === null;
  if (dayNotStarted) return;

  const dayIsDone = startedWorkout !== null && endedWorkout !== null;
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
              setLoggedSets(dayEx.loggedSetsCount + 1);
            }}
          >
            Log Set
          </Button>
          <Button
            className="rounded-full px-2"
            variant={"outline"}
            onClick={() => {
              setLoggedSets(dayEx.reps.length);
            }}
          >
            <CheckCheck />
          </Button>
        </>
      )}
    </div>
  );
}
