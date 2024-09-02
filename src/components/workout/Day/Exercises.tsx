import { AddButtonOverlay } from "~/components/workout/Common/AddButtonOverlay";
import type { ProgramDay } from "~/server/types";

import { getExercises } from "~/server/queries/exercises";
import { DataTable } from "./DataTable";
import { ActionCard } from "../Common/ActionCard";
import { EditButtonPopover } from "../Common/EditButtonPopover";
import { ExerciseForm } from "./ExerciseForm";
import { toTitleCase } from "~/utils/helpers";
import { ExerciseMuscleImage } from "~/utils/ExerciseMuscleImage";

async function EditExercisesButton({ programDay }: { programDay: ProgramDay }) {
  const allExercises = await getExercises(programDay!.userId);

  return (
    <AddButtonOverlay
      title="Add Exercise"
      description="Add an exercise to your workout. Click add when you're done."
      formComponent={
        <DataTable programDay={programDay} exercises={allExercises} />
      }
    />
  );
}

function ExerciseCard({
  userId,
  programId,
  dayId,
  exercise,
}: {
  userId: string;
  programId: number;
  dayId: number;
  exercise: {
    id: number;
    reps: number[];
    weight: number[];
    info: {
      id: number;
      name: string;
    };
    notes: {
      id: number;
      name: string | null;
    } | null;
  };
}) {
  if (!exercise) return;
  const isDone = !exercise.reps.includes(0);

  return (
    <ActionCard
      img={
        <ExerciseMuscleImage
          primaryMuscle=""
          secondaryMuscles={[]}
          widthInPx={100}
        />
      }
      linkTo={`/workout/${programId}/${dayId}/${exercise.id}`}
      title={
        exercise.notes?.name
          ? toTitleCase(exercise.notes.name)
          : toTitleCase(exercise.info.name)
      }
      subtext={`${exercise.reps.length} Sets`}
      editButton={
        <EditButtonPopover
          title="Edit Exercise"
          description={`Remember to click save when you're done.`}
          formComponent={
            <ExerciseForm
              userId={userId}
              programId={programId}
              dayExercise={exercise}
            />
          }
        />
      }
      isDark={isDone}
    />
  );
}



export function ExerciseItems({
  userId,
  programDay,
  programId,
  dayId,
}: {
  userId: string;
  programDay: ProgramDay;
  programId: number;
  dayId: number;
}) {
  return (
    <div className="flex flex-col gap-y-3">
      {programDay!.dayExercises.map(async (exercise) => (
        <ExerciseCard
          key={exercise.id}
          userId={userId}
          exercise={exercise}
          programId={programId}
          dayId={dayId}
        />
      ))}
    </div>
  );
}
