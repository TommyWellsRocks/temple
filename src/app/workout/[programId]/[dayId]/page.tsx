"use client";

import { setDay, useProgram } from "~/hooks/workout/useProgram";
import { ActionButtons } from "./_components/ActionButtons";
import { NavHeader } from "./_components/NavHeader";
import { SectionHeader } from "~/components/workout/SectionHeader";
import { AddButtonOverlay } from "~/components/workout/AddButtonOverlay";
import { DataTable } from "./_components/DataTable";
import { DayExercisesList } from "./_components/DayExercisesList";
import { MuscleSection } from "./_components/MuscleSection/MuscleSection";

// * DAY OVERVIEW PAGE

export default function DayOverview({ params }: { params: { dayId: string } }) {
  setDay(Number(params.dayId));
  const dayExercisesCount = useProgram(
    (state) => state.day?.dayExercises.length,
  );
  if (dayExercisesCount === undefined) return;

  return (
    <>
      <NavHeader />

      <MuscleSection />

      <section className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <SectionHeader
            title={`${dayExercisesCount} ${dayExercisesCount > 1 ? "Exercises" : "Exercise"}`}
          />
          <AddButtonOverlay
            title="Add Exercise"
            description="Add an exercise to your workout. Click add when you're done."
            formComponent={<DataTable />}
          />
        </div>

        <DayExercisesList />
      </section>

      <ActionButtons />
    </>
  );
}
