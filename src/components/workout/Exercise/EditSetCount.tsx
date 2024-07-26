"use client";

import { Minus, Plus } from "lucide-react";
import { handleEditSetCount } from "~/components/workout/ServerComponents/DayExercise";
import { DayExercise } from "~/server/types";

export function EditSetCount({
  method,
  userId,
  dayExercise,
}: {
  method: "Add" | "Delete";
  userId: string;
  dayExercise: DayExercise;
}) {
  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-gray-600 "
      style={{
        clipPath:
          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      }}
      onClick={() => {
        let repValues = dayExercise!.reps;
        let weightValues = dayExercise!.weight;

        if (method === "Add") {
          repValues.push(0);
          weightValues.push(0);
        } else {
          repValues.pop();
          weightValues.pop();
        }

        handleEditSetCount(userId, dayExercise!, repValues, weightValues);
      }}
    >
      {method === "Add" ? <Plus /> : <Minus />}
    </button>
  );
}
