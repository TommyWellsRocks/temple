"use client";

import { setDayExercise, useProgram } from "~/stores/ProgramStore";
import { Navigation } from "~/components/ui/Navigation";
import { SetInputs } from "~/components/workout/Exercise/SetInputs";
import {
  TabContents,
  TabSelectors,
} from "~/components/workout/Exercise/ExerciseTabs";
import { ActionButtons } from "~/components/workout/Exercise/ActionButtons";
import { Tabs } from "~/components/ui/tabs";
import { ExerciseForm } from "~/components/workout/Day/ExerciseForm";
import { EditButtonPopover } from "~/components/workout/Common/EditButtonPopover";

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
