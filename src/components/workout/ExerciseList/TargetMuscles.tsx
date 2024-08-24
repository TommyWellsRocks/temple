import { MuscleCarousel } from "~/components/workout/MuscleCarousel";
import type { ProgramDay } from "~/server/types";

function MusclesHeader() {
  return <h3 className="pb-2">Target Muscles</h3>;
}

export function TargetMuscles({ programDay }: { programDay: ProgramDay }) {
  if (!programDay) return;
  return (
    <section>
      <MusclesHeader />

      <MuscleCarousel
        muscleURLs={programDay.dayExercises.map((ex) =>
          ex.info.musclesImage ? ex.info.musclesImage : "",
        )}
      />
    </section>
  );
}
