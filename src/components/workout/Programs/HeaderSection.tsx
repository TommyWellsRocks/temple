import { AddButtonOverlay } from "~/components/workout/AddButtonOverlay";
import { SectionHeader } from "~/components/workout/SectionHeader";
import { ProgramForm } from "~/components/workout/forms/ProgramForm/ProgramForm";

export function HeaderSection() {
  return (
    <section className="flex items-center justify-between">
      <SectionHeader title="Your Programs" />
      <AddButtonOverlay
        title="Create Workout Program"
        description="Build and plan out your program. Click create when you're done."
        formComponent={<ProgramForm />}
      />
    </section>
  );
}
