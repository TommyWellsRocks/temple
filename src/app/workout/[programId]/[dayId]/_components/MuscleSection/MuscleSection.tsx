import { SectionHeader } from "~/components/workout/SectionHeader";
import { FocusMusclesSlider } from "./FocusMusclesSlider";

export function MuscleSection() {
  return (
    <section className="flex flex-col gap-y-2">
      <SectionHeader title="Today's Focus" />

      <FocusMusclesSlider />
    </section>
  );
}
