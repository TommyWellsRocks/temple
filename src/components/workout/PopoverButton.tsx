"use client";

import { Pencil } from "lucide-react";
import { ProgramForm } from "./forms/ProgramForm";
import { DayForm } from "~/components/workout/forms/DayForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ProgramDays, WorkoutPrograms } from "~/server/types";

export function PopoverButton({
  title,
  description,
  formType,
  formProps,
}: {
  title: string;
  description: string;
} & (
  | { formType: "Program"; formProps: { programInfo: WorkoutPrograms[0] } }
  | {
      formType: "ProgramDays";
      formProps: {
        dayInfo: ProgramDays[0];
      };
    }
)) {
  let FormComponent;

  if (formType === "Program") {
    FormComponent = (
      <ProgramForm
        userId={formProps.programInfo.userId}
        programInfo={formProps.programInfo}
      />
    );
  } else if (formType === "ProgramDays") {
    FormComponent = (
      <DayForm
        userId={formProps.dayInfo.userId}
        programId={formProps.dayInfo.programId}
        dayInfo={formProps.dayInfo}
      />
    );
  }

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
            <h4 className="font-medium leading-none">{title}</h4>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {FormComponent}
        </div>
      </PopoverContent>
    </Popover>
  );
}
