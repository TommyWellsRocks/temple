import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { DialogFooter } from "~/components/ui/dialog";
import { CreateButton } from "../CreateButton";
import { DeleteButton } from "../DeleteButton";
import { SaveButton } from "../SaveButton";

import type { ProgramDay } from "~/server/types";

export function FormButtons({
  dayInfo,
  setOpen,
}: {
  dayInfo?: ProgramDay;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const deleteDay = useProgram.getState().deleteDay;

  return (
    <DialogFooter>
      {!dayInfo ? (
        <CreateButton />
      ) : (
        <div className="flex w-full justify-between">
          <DeleteButton
            onClick={() => {
              if (setOpen) setOpen(false);
              deleteDay(dayInfo.programId, dayInfo.id);
            }}
          />
          <SaveButton />
        </div>
      )}
    </DialogFooter>
  );
}
