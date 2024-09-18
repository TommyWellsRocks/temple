import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import {
  handleCreateDayGroup,
  handleDeleteDayGroup,
} from "~/server/actions/workout/ProgramActions";
import { Minus, Plus } from "lucide-react";
import Loading from "~/app/loading";

export function EditWeeksButton({ groupId }: { groupId?: number }) {
  const [userId, programId] = useProgram((state) => [
    state.program?.userId,
    state.program?.id,
  ]);
  if (!userId || !programId) return <Loading />;

  return (
    <button
      className="mx-1"
      onClick={() => {
        if (groupId) {
          const shouldDelete = confirm(
            "Are you sure you want to remove latest sprint? ",
          );
          if (shouldDelete) handleDeleteDayGroup(userId, programId, groupId);
        } else {
          handleCreateDayGroup(userId, programId);
        }
      }}
    >
      {groupId ? <Minus /> : <Plus />}
    </button>
  );
}
