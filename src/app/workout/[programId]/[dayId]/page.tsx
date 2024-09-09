"use client";

import { setDay, useProgram } from "~/stores/ProgramStore";
import { ActionButtons } from "./_components/ActionButtons";
import { NavHeader } from "./_components/NavHeader";
import { SectionHeader } from "~/components/workout/SectionHeader";
import { getExercises } from "~/server/queries/exercises";
import { AddButtonOverlay } from "~/components/workout/AddButtonOverlay";
import { DataTable } from "./_components/DataTable";
import { FocusMusclesSlider } from "./_components/FocusMusclesSlider";
import { DayExercisesList } from "./_components/DayExercisesList";

// * DAY OVERVIEW PAGE

export default function DayOverview({ params }: { params: { dayId: string } }) {
  setDay(Number(params.dayId));
  const dayExercisesCount = useProgram(
    (state) => state.day?.dayExercises.length,
  );
  if (!dayExercisesCount) return;

  // const allExercises = await getExercises(programDay.userId);

  return (
    <>
      <NavHeader />

      <section className="flex flex-col gap-y-2">
        <SectionHeader title="Today's Focus" />

        <FocusMusclesSlider />
      </section>

      <section className="flex flex-col gap-y-2">
        <div className="flex justify-between">
          <SectionHeader
            title={`${dayExercisesCount} ${dayExercisesCount > 1 ? "Exercises" : "Exercise"}`}
          />
          {/* <AddButtonOverlay
            title="Add Exercise"
            description="Add an exercise to your workout. Click add when you're done."
            formComponent={
              <DataTable programDay={programDay} exercises={allExercises} />
            }
          /> */}
        </div>

        <DayExercisesList />
      </section>

      <ActionButtons />
    </>
  );
}
