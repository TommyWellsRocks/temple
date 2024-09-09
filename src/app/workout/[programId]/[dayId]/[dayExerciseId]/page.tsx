"use client";

import { setDayExercise, useProgram } from "~/stores/ProgramStore";
import { Navigation } from "~/components/ui/Navigation";
import { SetInputs } from "./_components/SetInputs";
import { TabContents, TabSelectors } from "./_components/ExerciseTabs";
import { ActionButtons } from "./_components/ActionButtons";
import { Tabs } from "~/components/ui/tabs";
import { ExerciseForm } from "~/components/workout/forms/ExerciseForm";
import { EditButtonPopover } from "~/components/workout/EditButtonPopover";

// * EXERCISE PAGE

export default function Exercise({
  params,
}: {
  params: { programId: string; dayExerciseId: string; dayId: string };
}) {
  setDayExercise(Number(params.dayId), Number(params.dayExerciseId));
  const dayExercise = useProgram((state) => state.dayExercise);
  if (!dayExercise) return;

  return (
    <>
      <Navigation
        backURL={`/workout/${Number(params.programId)}/${params.dayId}`}
        heading={`${dayExercise.notes?.name ? dayExercise.notes.name : dayExercise.info.name}`}
        editButton={
          <EditButtonPopover
            title="Edit Exercise"
            description={`Remember to click save when you're done.`}
            formComponent={
              <ExerciseForm
                userId={dayExercise.userId}
                programId={dayExercise.programId}
                dayExercise={dayExercise}
              />
            }
          />
        }
      />

      <div />

      <SetInputs />

      <section>
        <Tabs defaultValue="notes">
          <TabSelectors />

          <TabContents />
        </Tabs>
      </section>

      <ActionButtons />
    </>
  );
}
