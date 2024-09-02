import { AddButtonOverlay } from "~/components/workout/Common/AddButtonOverlay";
import { SectionHeader } from "~/components/workout/Common/SectionHeader";
import { ProgramForm } from "~/components/workout/Programs/ProgramForm";

export function ProgramsHeader({ userId }: { userId: string }) {
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
