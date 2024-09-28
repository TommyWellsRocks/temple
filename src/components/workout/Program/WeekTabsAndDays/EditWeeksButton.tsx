import { useUser } from "~/hooks/common/useUser";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { Minus, Plus } from "lucide-react";
import Loading from "~/app/loading";

export function EditWeeksButton({ groupId }: { groupId?: number }) {
  const userId = useUser((state) => state.userId);
  const programId = useProgram((state) => state.program?.id);
  const createWeekWithDays = useProgram.getState().createWeekWithDays;
  const deleteWeek = useProgram.getState().deleteWeek;
  if (!userId || !programId) return <Loading />;

  return (
    <button
      id={groupId ? "delete-week-button" : "add-week-button"}
      className="mx-1"
      onClick={() => {
        if (groupId) {
          const shouldDelete = confirm(
            "Are you sure you want to remove latest week? ",
          );
          if (shouldDelete) deleteWeek(userId, programId, groupId);
        } else {
          createWeekWithDays(userId, programId);
        }
      }}
    >
      {groupId ? <Minus /> : <Plus />}
    </button>
  );
}
