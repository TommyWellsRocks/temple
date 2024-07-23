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
import { DayForm, formSchema } from "./DayForm";
import { handleCreateDay } from "./ServerComponents";

export function CreateDay({
  userId,
  programId,
}: {
  userId: string;
  programId: number;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Day</DialogTitle>
          <DialogDescription>
            Build and plan your new workout program. Click create when you're
            done.
          </DialogDescription>
        </DialogHeader>

        <DayForm
          onSubmitFunction={(values: z.infer<typeof formSchema>) => {
            handleCreateDay(userId, programId, values.name, values.repeatOn);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
