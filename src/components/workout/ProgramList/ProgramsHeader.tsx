import { AddButtonOverlay } from "../AddButtonOverlay";
import { PageHeader } from "../PageHeader";
import { ProgramForm } from "./ProgramForm";

export function ProgramsHeader({ userId }: { userId: string }) {
  return (
    <section className="flex items-center justify-between">
      <PageHeader title="Your Programs"/>
      <AddButtonOverlay
        title="Create Workout Program"
        description="Build and plan out your program. Click create when you're done."
        formComponent={<ProgramForm userId={userId} />}
      />
    </section>
  );
}
