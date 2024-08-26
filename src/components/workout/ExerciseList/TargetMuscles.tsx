import { MuscleCarousel } from "~/components/workout/MuscleCarousel";
import type { ProgramDay } from "~/server/types";
import { PageHeader } from "../PageHeader";

export function TargetMuscles({ programDay }: { programDay: ProgramDay }) {
  if (!programDay) return;

  const muscleURLS = programDay.dayExercises.map((ex) =>
    ex.info.musclesImage ? ex.info.musclesImage : "",
  );

  return (
    <section className="flex flex-col gap-y-2">
      <PageHeader title="Target Muscles" />

      <MuscleCarousel muscleURLs={muscleURLS} />
    </section>
  );
}
