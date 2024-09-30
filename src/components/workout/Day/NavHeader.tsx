import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import Loading from "~/app/loading";
import { Navigation } from "~/components/ui/Navigation";
import { EditButton } from "../EditDayButton";

export function NavHeader() {
  const programDay = useProgram((state) => state.day);
  if (!programDay) return <Loading />;
  return (
    <Navigation
      backURL={`/workout/${programDay.programId}`}
      heading={`${programDay.name} Overview`}
      editButton={<EditButton day={programDay} />}
    />
  );
}
