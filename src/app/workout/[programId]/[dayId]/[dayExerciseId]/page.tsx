"use client";

import { setDayExercise } from "~/hooks/workout/useProgram/actions/exercise";

import { HeaderNav } from "~/components/workout/Exercise/HeaderNav";
import { Sets } from "~/components/workout/Exercise/Sets/Sets";
import { ExerciseTabs } from "~/components/workout/Exercise/ExerciseTabs/ExerciseTabs";
import { ActionButtons } from "~/components/workout/Exercise/ActionButtons/ActionButtons";

// * EXERCISE PAGE

export default function Exercise({
  params,
}: {
  params: { programId: string; dayExerciseId: string; dayId: string };
}) {
  setDayExercise(Number(params.dayId), Number(params.dayExerciseId));

  return (
    <>
      <HeaderNav />

      <div />

      <Sets />

      <ExerciseTabs />

      <ActionButtons />
    </>
  );
}
