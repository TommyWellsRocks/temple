import Image from "next/image";
import Link from "next/link";
import playButtonURL from "/public/content/images/workout/action-play.svg";
import trophyButtonURL from "/public/content/images/workout/action-trophy.svg";
import { AddButtonOverlay } from "../AddButtonOverlay";
import { ProgramDay } from "~/server/types";

import { getExercises } from "~/server/queries/exercises";
import { ExerciseForm } from "~/app/components/workout/ExerciseList/ExerciseForm";

function CheckListHeader({
  doneCount,
  totalCount,
}: {
  doneCount: number;
  totalCount: number;
}) {
  return (
    <div className="flex justify-between">
      <h3 className="pb-2">The Checklist 😎</h3>
      <h3 className="text-sm font-light">
        <strong className="text-xl">{doneCount}</strong> /{totalCount}
      </h3>
    </div>
  );
}

function CheckListItem({
  programId,
  dayId,
  exercise,
}: {
  programId: number;
  dayId: number;
  exercise: {
    id: number;
    reps: number[];
    info: {
      name: string;
      tips: string;
      targetMuscleImages: string[] | null;
      images: string[] | null;
    };
  };
}) {
  if (!exercise) return;
  const isDone = !exercise.reps.includes(0);

  return (
    <Link
      className={`flex cursor-pointer items-center justify-between rounded-xl px-4 py-2 ${isDone ? "bg-doneDark" : "bg-undoneDark"}`}
      href={`/workout/${programId}/${dayId}/${exercise.id}`}
    >
      <div className="flex items-start gap-x-3">
        <Image
          className="mt-1 rounded-md"
          src={
            exercise.info.images
              ? (exercise.info.images[0] as string)
              : "https://placehold.co/200x200"
          }
          alt="Exercise Image."
          width={50}
          height={50}
        />
        <div>
          <div className="text-base">{exercise.info.name}</div>
          <div className="text-sm font-light">
            {exercise.info.tips.slice(0, 40)}...
          </div>
        </div>
      </div>
      <Image
        className="rounded-full border border-primary"
        src={isDone ? trophyButtonURL : playButtonURL}
        alt="Action."
      />
    </Link>
  );
}

function CheckListItems({
  programDay,
  programId,
  dayId,
}: {
  programDay: ProgramDay;
  programId: number;
  dayId: number;
}) {
  return (
    <div className="flex flex-col gap-y-3">
      {programDay!.dayExercises.map(async (exercise) => (
        <CheckListItem
          exercise={exercise}
          programId={programId}
          dayId={dayId}
        />
      ))}
    </div>
  );
}

async function EditExercisesButtons({
  programDay,
}: {
  programDay: ProgramDay;
}) {
  const allExercises = await getExercises();

  return (
    <section>
      <div className="flex justify-center gap-3 pt-5">
        <AddButtonOverlay
          title="Add Exercise"
          description="Add an exercise to your workout. Click add when you're done."
          formComponent={
            <ExerciseForm
              programDay={programDay}
              exercises={allExercises}
              method="Add"
            />
          }
        />
        <AddButtonOverlay
          title="Delete Exercise"
          description="Delete an exercise from your workout. Click delete when you're done."
          formComponent={
            <ExerciseForm
              programDay={programDay}
              exercises={allExercises}
              method="Delete"
            />
          }
          method="Delete"
        />
      </div>
    </section>
  );
}

export async function CheckList({
  programId,
  dayId,
  programDay,
}: {
  programId: number;
  dayId: number;
  programDay: ProgramDay;
}) {
  const doneCount = programDay!.dayExercises.filter(
    (exercise) => !exercise.reps.includes(0),
  ).length;
  const totalCount = programDay!.dayExercises.length;

  return (
    <section>
      <CheckListHeader doneCount={doneCount} totalCount={totalCount} />

      <CheckListItems
        programDay={programDay}
        programId={programId}
        dayId={dayId}
      />
      <EditExercisesButtons programDay={programDay} />
    </section>
  );
}
