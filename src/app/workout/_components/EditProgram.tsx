"use client";

import { Pencil } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { z } from "zod";
import { handleEditProgram } from "./ServerComponents";
import { ProgramForm, formSchema } from "./ProgramForm";
import { ProgramDays } from "~/server/types";

export function EditProgram({
  userId,
  currentInfo,
}: {
  userId: string;
  currentInfo: ProgramDays[0];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>
          <Pencil width={15} height={15} />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Edit Workout Program</h4>
            <p className="text-sm text-muted-foreground">
              Remember to click edit when your done.
            </p>
          </div>
          <ProgramForm
            onSubmitFunction={(values: z.infer<typeof formSchema>) => {
              handleEditProgram(
                userId,
                currentInfo.id,
                values.name,
                values.start,
                values.end,
              );
            }}
            currentInfo={currentInfo}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
