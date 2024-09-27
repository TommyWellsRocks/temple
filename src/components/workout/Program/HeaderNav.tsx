import Loading from "~/app/loading";
import { Navigation } from "~/components/ui/Navigation";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { EditButton } from "../EditProgramButton";

export function HeaderNav() {
  const program = useProgram((state) => state.program);
  if (!program) return <Loading />;

  return (
    <Navigation
      backURL="/workout"
      heading={program.name}
      editButton={<EditButton program={program} />}
    />
  );
}
