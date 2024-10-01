"use client";

import { useEffect } from "react";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { useExerciseHistory } from "~/hooks/workout/useExerciseHistory";

import Loading from "~/app/loading";
import { HeaderNav } from "~/components/workout/Exercise/HeaderNav";
import { Sets } from "~/components/workout/Exercise/Sets/Sets";
import { ExerciseTabs } from "~/components/workout/Exercise/ExerciseTabs/ExerciseTabs";
import { ActionButtons } from "~/components/workout/Exercise/ActionButtons/ActionButtons";

// * EXERCISE PAGE

export default function Exercise() {
  const dayEx = useProgram((state) => state.dayExercise);
  const lastSession = useExerciseHistory((state) =>
    state.exerciseHistory?.at(0),
  );
  const updateExVolume = useProgram.getState().updateExerciseVolume;
  if (!dayEx) return <Loading />;

  // Update the DayExercise with previous session values if not logged and are zero (on page load)
  useEffect(() => {
    let shouldMakeChange = false;
    const updatedReps = [...dayEx.reps];
    const updatedWeight = [...dayEx.weight];
    dayEx.reps.forEach((_, index) => {
      const isLogged = index < dayEx.loggedSetsCount;
      const shouldBeLastReps = !isLogged && dayEx.reps[index] === 0;
      const shouldBeLastWeight = !isLogged && dayEx.weight[index] === 0;
      if (shouldBeLastReps || shouldBeLastWeight) shouldMakeChange = true;
      if (shouldBeLastReps)
        updatedReps[index] = lastSession?.reps.at(index) || 0;
      if (shouldBeLastWeight)
        updatedWeight[index] = lastSession?.weight.at(index) || 0;
    });
    if (shouldMakeChange)
      updateExVolume(
        dayEx.programId,
        dayEx.dayId,
        dayEx.id,
        dayEx.userId,
        updatedReps,
        updatedWeight,
      );
  }, []);

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
