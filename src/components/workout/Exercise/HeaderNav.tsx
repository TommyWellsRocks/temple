import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import Loading from "~/app/loading";
import { Navigation } from "~/components/ui/Navigation";
import { EditButton } from "../EditExerciseButton";

export function HeaderNav() {
  const dayExercise = useProgram((state) => state.dayExercise);
  if (!dayExercise) return <Loading />;

  return (
    <Navigation
      backURL={`/workout/${dayExercise.programId}/${dayExercise.dayId}`}
      heading={`${dayExercise.notes?.name ? dayExercise.notes.name : dayExercise.info.name}`}
      editButton={<EditButton exercise={dayExercise} />}
    />
  );
}
