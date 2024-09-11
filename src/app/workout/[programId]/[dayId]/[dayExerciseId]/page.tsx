"use client";

import { setDayExercise } from "~/hooks/workout/useProgram";

import { HeaderNav } from "./_components/HeaderNav";
import { Sets } from "./_components/Sets/Sets";
import { ExerciseTabs } from "./_components/ExerciseTabs/ExerciseTabs";
import { ActionButtons } from "./_components/ActionButtons";

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
