import { handleDeleteExercise } from "~/server/actions/workout/DayActions";

import { DialogFooter } from "~/components/ui/dialog";
import { DeleteButton } from "../DeleteButton";
import { SaveButton } from "../SaveButton";

export function FormButtons({
  userId,
  programId,
  dayExerciseId,
}: {
  userId: string;
  programId: number;
  dayExerciseId: number;
}) {
  return (
    <DialogFooter>
      <div className="flex">
        <DeleteButton
          onClick={() => handleDeleteExercise(userId, programId, dayExerciseId)}
        />
        <SaveButton />
      </div>
    </DialogFooter>
  );
}
