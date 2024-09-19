import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { DialogFooter } from "~/components/ui/dialog";
import { CreateButton } from "../CreateButton";
import { DeleteButton } from "../DeleteButton";
import { SaveButton } from "../SaveButton";

import type { ProgramDay } from "~/server/types";

export function FormButtons({ dayInfo }: { dayInfo?: ProgramDay }) {
  const deleteDay = useProgram.getState().deleteDay;

  return (
    <DialogFooter>
      {!dayInfo ? (
        <CreateButton />
      ) : (
        <div className="flex">
          <DeleteButton
            onClick={() =>
              deleteDay(dayInfo.userId, dayInfo.programId, dayInfo.id)
            }
          />
          <SaveButton />
        </div>
      )}
    </DialogFooter>
  );
}
