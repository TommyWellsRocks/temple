import Loading from "~/app/loading";
import { Navigation } from "~/components/ui/Navigation";
import { EditButtonPopover } from "~/components/workout/EditButtonPopover";
import { ProgramForm } from "~/components/workout/forms/ProgramForm/ProgramForm";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";

export function HeaderNav() {
  const program = useProgram((state) => state.program);
  if (!program) return <Loading />;

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
