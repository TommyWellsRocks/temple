import { handleDeleteProgramDay } from "~/server/actions/workout/ProgramActions";

import { DialogFooter } from "~/components/ui/dialog";

import type { ProgramDay } from "~/server/types";
import { CreateButton } from "../CreateButton";
import { DeleteButton } from "../DeleteButton";
import { SaveButton } from "../SaveButton";

export function FormButtons({ dayInfo }: { dayInfo: ProgramDay }) {
  return (
    <DialogFooter>
      {!dayInfo ? (
        <CreateButton />
      ) : (
        <div className="flex">
          <DeleteButton
            onClick={() =>
              handleDeleteProgramDay(
                dayInfo.userId,
                dayInfo.programId,
                dayInfo.id,
              )
            }
          />
          <SaveButton />
        </div>
      )}
    </DialogFooter>
  );
}
