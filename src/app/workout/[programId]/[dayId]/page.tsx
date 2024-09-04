"use client";

import { useProgram } from "~/stores/ProgramStore";
import { ActionButtons } from "~/components/workout/Day/ActionButtons";
import { NavHeader } from "~/components/workout/Exercise/NavHeader";
import { SectionHeader } from "~/components/workout/Common/SectionHeader";
import { getExercises } from "~/server/queries/exercises";
import { AddButtonOverlay } from "~/components/workout/Common/AddButtonOverlay";
import { DataTable } from "~/components/workout/Day/DataTable";
import { FocusMusclesSlider } from "~/components/workout/Day/FocusMusclesSlider";
import { DayExercisesList } from "~/components/workout/Day/DayExercisesList";

// * DAY OVERVIEW PAGE

export default function DayOverview({
  params,
}: {
  params: { dayId: string };
}) {
  const dayExercisesCount = useProgram(
    (state) =>
      state.program?.programDays.find((day) => day.id === Number(params.dayId))
        ?.dayExercises.length,
  );
  if (!dayExercisesCount) return;

  // const allExercises = await getExercises(programDay.userId);

  return (
    <>
      <NavHeader dayId={Number(params.dayId)} />

      <section className="flex flex-col gap-y-2">
        <SectionHeader title="Today's Focus" />

        <FocusMusclesSlider dayId={Number(params.dayId)} />
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

        <DayExercisesList dayId={Number(params.dayId)} />
      </section>

      <ActionButtons dayId={Number(params.dayId)} />
    </>
  );
}
