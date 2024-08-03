"use client";

import { Minus, Plus } from "lucide-react";
import { handleEditSetCount } from "~/components/workout/ServerComponents/DayExercise";
import { clipPathHexagon } from "./Hexagon";

export function EditSetCount({
  method,
  dayExercise,
}: {
  method: "Add" | "Delete";
  dayExercise: {
    id: number;
    userId: string;
    programId: number;
    dayId: number;
    reps: number[];
    weight: number[];
  };
}) {
  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-primary"
      style={{
        clipPath: clipPathHexagon,
      }}
      onClick={() => {
        let repValues = dayExercise!.reps;
        let weightValues = dayExercise!.weight;

        if (method === "Add") {
          repValues.push(0);
          weightValues.push(weightValues[weightValues.length - 1]!);
        } else {
          repValues.pop();
          weightValues.pop();
        }

        handleEditSetCount(dayExercise!, repValues, weightValues);
      }}
    >
      {method === "Add" ? <Plus /> : <Minus />}
    </button>
  );
}
