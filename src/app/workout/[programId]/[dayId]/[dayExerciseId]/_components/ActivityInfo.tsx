import type { DayExercise } from "~/server/types";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

function PreviousSessionButton({
  previousExercise,
}: {
  previousExercise: DayExercise;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Previous</Button>
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
          <div
            key={index}
            className="flex items-center gap-1 rounded-md border border-gray-600 text-base"
          >
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

export function ActivityInfo({
  setCount,
  previousExercise,
}: {
  setCount: number;
  previousExercise: DayExercise;
}) {
  return (
    <section className="grid w-full grid-cols-3 items-center">
      <div />

      <div className="justify-self-center text-sm font-light underline underline-offset-4">
        {setCount}
        {setCount === 1 ? " Set" : " Sets"}
      </div>

      <div className="justify-self-end">
        {previousExercise ? (
          <PreviousSessionButton previousExercise={previousExercise} />
        ) : null}
      </div>
    </section>
  );
}
