import { handleDeleteProgram } from "~/server/actions/workout/ProgramsActions";

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
  return (
    <DialogFooter>
      {!programInfo ? (
        <CreateButton />
      ) : (
        <div className="flex justify-between">
          <DeleteButton
            onClick={() => handleDeleteProgram(userId, programInfo.id)}
          />
          <SaveButton />
        </div>
      )}
    </DialogFooter>
  );
}
