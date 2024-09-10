import { AddButtonOverlay } from "~/components/workout/AddButtonOverlay";
import { SectionHeader } from "~/components/workout/SectionHeader";
import { ProgramForm } from "~/components/workout/forms/ProgramForm";

export function HeaderSection({ userId }: { userId: string }) {
  return (
    <section className="flex items-center justify-between">
      <SectionHeader title="Your Programs" />
      <AddButtonOverlay
        title="Create Workout Program"
        description="Build and plan out your program. Click create when you're done."
        formComponent={<ProgramForm userId={userId} />}
      />
    </section>
  );
}
