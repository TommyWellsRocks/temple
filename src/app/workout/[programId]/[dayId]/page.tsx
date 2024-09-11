"use client";

import { setDay } from "~/hooks/workout/useProgram";

import { NavHeader } from "~/components/workout/Day/NavHeader";
import { MuscleSection } from "~/components/workout/Day/MuscleSection/MuscleSection";
import { ExercisesSection } from "~/components/workout/Day/ExercisesSection/ExercisesSection";
import { ActionButtons } from "~/components/workout/Day/ActionButtons/ActionButtons";

// * DAY OVERVIEW PAGE

export default function DayOverview({ params }: { params: { dayId: string } }) {
  setDay(Number(params.dayId));

  return (
    <>
      <NavHeader />

      <MuscleSection />

      <ExercisesSection />

      <ActionButtons />
    </>
  );
}
