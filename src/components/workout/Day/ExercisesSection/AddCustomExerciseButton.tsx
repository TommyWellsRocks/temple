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
import { useState } from "react";
import { UserExerciseForm } from "../../forms/UserExerciseForm/UserExerciseForm";

export function AddCustomExerciseButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" id="add-custom-exercise-button">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom Exercise</DialogTitle>
          <DialogDescription>Create Your Own Exercise.</DialogDescription>
        </DialogHeader>

        <UserExerciseForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
