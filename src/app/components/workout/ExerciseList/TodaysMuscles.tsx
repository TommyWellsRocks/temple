import { MuscleCarousel } from "~/app/components/workout/MuscleCarousel";

function MusclesHeader() {
  return <h3 className="pb-2">Today's Muscles</h3>;
}

export function TodaysMuscles({ muscleURLs }: { muscleURLs: string[] }) {
  return (
    <section>
      <MusclesHeader />

      <MuscleCarousel muscleURLs={muscleURLs} />
    </section>
  );
}
