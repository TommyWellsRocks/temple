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
import { ProgramForm } from "../../forms/ProgramForm/ProgramForm";
import { useState } from "react";

export function AddButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" id="add-program-button">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workout Program</DialogTitle>
          <DialogDescription>
            Build and plan out your program.
          </DialogDescription>
        </DialogHeader>

        <ProgramForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
