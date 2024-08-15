import { AddButtonOverlay } from "~/components/workout/AddButtonOverlay";
import type { ProgramDay } from "~/server/types";

import { getExercises } from "~/server/queries/exercises";
import { DataTable } from "./DataTable";
import { ActionCard } from "../ActionCard";
import { EditButtonPopover } from "../EditButtonPopover";
import { ExerciseForm } from "./ExerciseForm";

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

function ExercisesHeader({ programDay }: { programDay: ProgramDay }) {
  const totalCount = programDay!.dayExercises.length;

  return (
    <div className="flex items-center justify-between">
      <h3>{totalCount} Exercises</h3>
      <EditExercisesButton programDay={programDay} />
    </div>
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
      linkTo={`/workout/${programId}/${dayId}/${exercise.id}`}
      imageURL="https://placehold.co/200x600"
      title={
        exercise.notes?.name
          ? exercise.notes.name
          : exercise.info.name
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

function Exercises({
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

export async function CheckList({
  userId,
  programId,
  dayId,
  programDay,
}: {
  userId: string;
  programId: number;
  dayId: number;
  programDay: ProgramDay;
}) {
  return (
    <section className="flex flex-col gap-y-2">
      <ExercisesHeader programDay={programDay} />

      <Exercises
        userId={userId}
        programDay={programDay}
        programId={programId}
        dayId={dayId}
      />
    </section>
  );
}
