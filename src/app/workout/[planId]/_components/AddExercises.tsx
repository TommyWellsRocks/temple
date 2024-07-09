import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { getExercises } from "~/server/queries/exercises";

import { ComboboxForm } from "./Exercises";

export async function AddExercises() {
  const exercises = await getExercises();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Exercises</DialogTitle>
          <DialogDescription>
            Add and remove exercises to your workout. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <ComboboxForm exercises={exercises}/>

      </DialogContent>
    </Dialog>
  );
}
