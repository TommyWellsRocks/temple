"use client";

import { EllipsisVertical } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export function EditButtonPopover({
  title,
  description,
  formComponent,
}: {
  title: string;
  description: string;
  formComponent: JSX.Element;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="align-middle">
          <EllipsisVertical />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-3">
          <div className="space-y-2 text-center">
            <h4 className="font-medium leading-none">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {formComponent}
        </div>
      </PopoverContent>
    </Popover>
  );
}
