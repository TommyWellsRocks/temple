"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { DayExercise } from "~/server/types";

export function PreviousSessionButton({
  previousExercise,
}: {
  previousExercise: DayExercise;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Last</Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col items-center text-center sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {previousExercise!.info.name}
          </DialogTitle>
          <DialogDescription className="text-center">
            Your previous session
          </DialogDescription>
        </DialogHeader>

        {previousExercise!.reps.map((repCount, index) => (
          <div className="flex items-center gap-1 rounded-md border border-gray-600">
            <span className="rounded-s-md border border-gray-600 bg-gray-900 px-1 font-medium text-gray-400">
              Set {index + 1}:
            </span>
            <span className="px-1">
              {repCount} Reps x {previousExercise!.weight[index]} Pounds
            </span>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
