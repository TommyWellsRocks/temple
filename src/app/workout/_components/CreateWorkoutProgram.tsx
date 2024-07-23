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

import { z } from "zod";
import { handleCreateWorkoutProgram } from "./ServerComponents";
import { ProgramForm, formSchema } from "./ProgramForm";

export function CreateWorkoutProgram({ userId }: { userId: string }) {
  function handleCreate(values: z.infer<typeof formSchema>) {
    handleCreateWorkoutProgram(
      userId,
      values.name,
      values.start,
      values.end,
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
          <DialogTitle>Create Workout Program</DialogTitle>
          <DialogDescription>
            Build and plan your new workout program. Click create when you're done.
          </DialogDescription>
        </DialogHeader>

        <ProgramForm onSubmitFunction={handleCreate} />
      </DialogContent>
    </Dialog>
  );
}
