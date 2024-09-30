import { DialogFooter } from "~/components/ui/dialog";
import { DeleteButton } from "../DeleteButton";
import { SaveButton } from "../SaveButton";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";

export function FormButtons({
  userId,
  programId,
  dayId,
  dayExerciseId,
}: {
  userId: string;
  programId: number;
  dayId: number;
  dayExerciseId: number;
}) {
  const deleteExercise = useProgram.getState().deleteExercise;
  return (
    <DialogFooter>
      <div className="flex w-full justify-between">
        <DeleteButton
          onClick={() =>
            deleteExercise(userId, programId, dayId, dayExerciseId)
          }
        />
        <SaveButton />
      </div>
    </DialogFooter>
  );
}
