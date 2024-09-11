import { ExercisesHeader } from "./ExercisesHeader";

import { ExercisesList } from "./ExercisesList";

export function ExercisesSection() {
  return (
    <section className="flex flex-col gap-y-2">
      <ExercisesHeader />

      <ExercisesList />
    </section>
  );
}
