"use client";

import { Minus, Plus } from "lucide-react";
import {
  handleCreateDayGroup,
  handleDeleteDayGroup,
} from "~/components/workout/ServerComponents/ProgramDay";

export function EditGroupsButton({
  userId,
  programId,
  groupId,
}: {
  userId: string;
  programId: number;
  groupId?: number;
}) {
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
