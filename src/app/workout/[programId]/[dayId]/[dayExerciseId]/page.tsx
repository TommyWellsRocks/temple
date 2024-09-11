"use client";

import { setDayExercise } from "~/hooks/workout/useProgram";
import { SetInputs } from "./_components/SetInputs";
import { ExerciseTabs } from "./_components/ExerciseTabs";
import { ActionButtons } from "./_components/ActionButtons";
import { HeaderNav } from "./_components/HeaderNav";

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

      <SetInputs />

      <ExerciseTabs />

      <ActionButtons />
    </>
  );
}
