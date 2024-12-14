import { useExercises } from "~/hooks/workout/useExercises";

import { DialogFooter } from "~/components/ui/dialog";
import { CreateButton } from "../CreateButton";
import { DeleteButton } from "../DeleteButton";
import { SaveButton } from "../SaveButton";

import type { Exercises } from "~/server/types";

export function FormButtons({ exercise }: { exercise?: Exercises[0] }) {
  const deleteUserExercise = useExercises.getState().deleteUserExercise;

  return (
    <DialogFooter>
      {!exercise ? (
        <CreateButton />
      ) : (
        <div className="flex justify-between">
          <DeleteButton onClick={() => deleteUserExercise(exercise.id)} />
          <SaveButton />
        </div>
      )}
    </DialogFooter>
  );
}
