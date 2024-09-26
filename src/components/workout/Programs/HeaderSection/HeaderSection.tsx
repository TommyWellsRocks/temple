import { SectionHeader } from "~/components/workout/SectionHeader";
import { AddButton } from "./AddButton";

export function HeaderSection() {
  return (
    <section className="flex items-center justify-between">
      <SectionHeader title="Your Programs" id="programs-header" />
      <AddButton />
    </section>
  );
}
