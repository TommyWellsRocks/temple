import { SectionHeader } from "~/components/workout/SectionHeader";
import { MuscleSlider } from "./MusclesSlider";

export function MuscleSection() {
  return (
    <section className="flex flex-col gap-y-2">
      <SectionHeader title="Today's Focus" />

      <MuscleSlider />
    </section>
  );
}
