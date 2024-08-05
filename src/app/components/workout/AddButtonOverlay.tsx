"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "~/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/components/ui/dialog";

export function AddButtonOverlay({
  title,
  description,
  formComponent,
  method,
}: {
  title: string;
  description: string;
  formComponent: JSX.Element;
  method?: "Add" | "Delete";
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {method === "Add" ? <Plus /> : <Minus />}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {formComponent}
      </DialogContent>
    </Dialog>
  );
}
