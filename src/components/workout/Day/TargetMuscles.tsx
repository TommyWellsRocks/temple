import { MuscleCarousel } from "~/components/workout/Common/MuscleCarousel";
import type { ProgramDay } from "~/server/types";
import { PageHeader } from "~/components/workout/Common/PageHeader";

export function TargetMuscles({ programDay }: { programDay: ProgramDay }) {
  if (!programDay) return;

  return (
    <section className="flex flex-col gap-y-2">
      <PageHeader title="Target Muscles" />

      <MuscleCarousel dayExercises={programDay.dayExercises} />
    </section>
  );
}
