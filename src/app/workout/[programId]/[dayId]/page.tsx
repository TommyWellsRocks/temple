"use client";

import { setDay } from "~/hooks/workout/useProgram";

import { NavHeader } from "./_components/NavHeader";
import { MuscleSection } from "./_components/MuscleSection/MuscleSection";
import { ExercisesSection } from "./_components/ExercisesSection/ExercisesSection";
import { ActionButtons } from "./_components/ActionButtons";

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
