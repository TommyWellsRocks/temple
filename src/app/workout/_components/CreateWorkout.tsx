"use client";

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
import { WorkoutForm, formSchema } from "./workoutform";
import { z } from "zod";
import { handleCreateWorkout } from "./ServerComponents";

export function CreateWorkout({ userId }: { userId: string }) {
  function handleCreate(values: z.infer<typeof formSchema>) {
    handleCreateWorkout(
      userId,
      values.name,
      values.start ? values.start.toISOString() : null,
      values.end ? values.end.toISOString() : null,
      values.repeat ? values.repeat : null,
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Workout</DialogTitle>
          <DialogDescription>
            Build and plan your new workout. Click create when you're done.
          </DialogDescription>
        </DialogHeader>

        <WorkoutForm userId={userId} onSubmitFunction={handleCreate} />
      </DialogContent>
    </Dialog>
  );
}
