import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { DialogFooter } from "~/components/ui/dialog";
import { CreateButton } from "../CreateButton";
import { DeleteButton } from "../DeleteButton";
import { SaveButton } from "../SaveButton";

import type { WorkoutPrograms } from "~/server/types";

export function FormButtons({
  userId,
  programInfo,
  setOpen,
}: {
  userId: string;
  programInfo?: WorkoutPrograms[0];
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const deleteProgram = useProgram.getState().deleteProgram;

  return (
    <DialogFooter>
      {!programInfo ? (
        <CreateButton />
      ) : (
        <div className="flex w-full justify-between">
          <DeleteButton
            onClick={() => {
              if (setOpen) setOpen(false);
              deleteProgram(userId, programInfo.id);
            }}
          />
          <SaveButton />
        </div>
      )}
    </DialogFooter>
  );
}
