import { MuscleCarousel } from "~/components/workout/MuscleCarousel";

function MusclesHeader() {
  return <h3 className="pb-2">Target Muscles</h3>;
}

export function TargetMuscles({ muscleURLs }: { muscleURLs: string[] }) {
  return (
    <section>
      <MusclesHeader />

      <MuscleCarousel muscleURLs={muscleURLs} />
    </section>
  );
}
