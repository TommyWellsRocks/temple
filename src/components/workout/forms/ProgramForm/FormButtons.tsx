import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { DialogFooter } from "~/components/ui/dialog";
import { CreateButton } from "../CreateButton";
import { DeleteButton } from "../DeleteButton";
import { SaveButton } from "../SaveButton";

import type { WorkoutPrograms } from "~/server/types";

export function FormButtons({
  userId,
  programInfo,
}: {
  userId: string;
  programInfo?: WorkoutPrograms[0];
}) {
  const deleteProgram = useProgram.getState().deleteProgram;

  return (
    <DialogFooter>
      {!programInfo ? (
        <CreateButton />
      ) : (
        <div className="flex w-full justify-between">
          <DeleteButton onClick={() => deleteProgram(userId, programInfo.id)} />
          <SaveButton />
        </div>
      )}
    </DialogFooter>
  );
}
