"use client";

import { Minus, Plus } from "lucide-react";
import { handleEditSets } from "./ServerComponents";
import { SessionExercise } from "~/server/types";

export function EditSets({
  method,
  userId,
  sessionExercise,
}: {
  method: "Add" | "Delete";
  userId: string;
  sessionExercise: SessionExercise;
}) {
  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-gray-600 "
      style={{
        clipPath:
          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      }}
      onClick={() => {
        let repValues = sessionExercise.reps;
        let weightValues = sessionExercise.weight;
        
        if (method === "Add") {
          repValues.push(0);
          weightValues.push(0);
        } else {
          repValues.pop();
          weightValues.pop();
        }

        handleEditSets(
          userId,
          sessionExercise.workoutId,
          sessionExercise.exerciseId,
          sessionExercise.id,
          repValues,
          weightValues,
        );
      }}
    >
      {method === "Add" ? <Plus /> : <Minus />}
    </button>
  );
}
