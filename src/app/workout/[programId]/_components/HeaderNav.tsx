import { Navigation } from "~/components/ui/Navigation";
import { EditButtonPopover } from "~/components/workout/EditButtonPopover";
import { ProgramForm } from "~/components/workout/forms/ProgramForm";
import { useProgram } from "~/hooks/workout/useProgram";

export function HeaderNav() {
  const program = useProgram((state) => state.program);
  if (!program) return;

  return (
    <Navigation
      backURL="/workout"
      heading={program.name}
      editButton={
        <EditButtonPopover
          title="Edit Program"
          description={`Remember to click save when you're done.`}
          formComponent={<ProgramForm programInfo={program} />}
        />
      }
    />
  );
}
