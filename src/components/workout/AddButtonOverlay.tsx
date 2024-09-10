"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

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
          {method === "Delete" ? <Minus /> : <Plus />}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {formComponent}
      </DialogContent>
    </Dialog>
  );
}
