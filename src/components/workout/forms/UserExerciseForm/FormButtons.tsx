import { handleDeleteUserExercise } from "~/server/actions/workout/UserExerciseActions";

import { DialogFooter } from "~/components/ui/dialog";
import { CreateButton } from "../CreateButton";
import { DeleteButton } from "../DeleteButton";
import { SaveButton } from "../SaveButton";

import type { Exercises } from "~/server/types";

export function FormButtons({
  userId,
  exercise,
}: {
  userId: string;
  exercise?: Exercises[0];
}) {
  return (
    <DialogFooter>
      {!exercise ? (
        <CreateButton />
      ) : (
        <div className="flex justify-between">
          <DeleteButton
            onClick={() => {
              handleDeleteUserExercise(userId, exercise.id);
            }}
          />
          <SaveButton />
        </div>
      )}
    </DialogFooter>
  );
}
