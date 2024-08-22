"use client";

import type { DayExercise } from "~/server/types";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft, CheckCheck } from "lucide-react";
import { useActiveInputs } from "~/context/ActiveExerciseInputContext";

export function ActionButtons({ dayExercise }: { dayExercise: DayExercise }) {
  const dayNotStarted =
    dayExercise?.day.startedWorkout === null &&
    dayExercise?.day.endedWorkout === null;
  if (dayNotStarted) return;

  const dayIsDone =
    dayExercise?.day.startedWorkout !== null &&
    dayExercise?.day.endedWorkout !== null;
  if (dayIsDone) return;

  const {
    loggedSetList,
    setLoggedSetList,
    activeSetIndex,
    setActiveSetIndex,
    inputLen,
    setInputLen,
  } = useActiveInputs()!;

  const allLogged = loggedSetList.length === inputLen;

  return (
    <div className="sticky bottom-5 flex justify-between">
      {allLogged ? (
        <Link
          href={`/workout/${dayExercise?.programId}/${dayExercise?.dayId}`}
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
            className="w-2/3"
            variant={"secondary"}
            onClick={() => {
              setActiveSetIndex((prevActiveSet: number) => prevActiveSet + 1);
              setLoggedSetList((prevLoggedSets: number[]) => {
                const newLoggedSets = [...prevLoggedSets, activeSetIndex];
                return newLoggedSets;
              });
            }}
          >
            Log Set
          </Button>
          <Button
            className="rounded-full px-2"
            variant={"outline"}
            onClick={() => {
              setActiveSetIndex(dayExercise.reps.length);
              setLoggedSetList(() => {
                const newLoggedSets = [];
                for (let i = 0; i < dayExercise.reps.length; i++)
                  newLoggedSets.push(i);
                return newLoggedSets;
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
