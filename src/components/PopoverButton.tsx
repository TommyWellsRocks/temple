"use client";

import { Pencil } from "lucide-react";
import { z } from "zod";
import { handleEditProgram } from "~/components/ServerComponents/Program";
import { handleEditProgramDay } from "~/components/ServerComponents/ProgramDay";
import {
  ProgramForm,
  formSchema as programFormSchema,
} from "./forms/ProgramForm";
import {
  DayForm,
  formSchema as dayFormSchema,
} from "~/components/forms/DayForm";
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
  formType: "Program" | "ProgramDay";
  formProps: {
    userId: string;
    programInfo?: WorkoutPrograms[0];
    dayInfo?: ProgramDays[0];
  };
}) {
  let FormComponent;

  if (formType === "Program") {
    FormComponent = (
      <ProgramForm
        onSubmitFunction={(values: z.infer<typeof programFormSchema>) => {
          handleEditProgram(
            formProps.userId,
            formProps.programInfo!.id,
            values.name,
            values.start,
            values.end,
          );
        }}
        programInfo={formProps.programInfo}
      />
    );
  } else if (formType === "ProgramDay") {
    FormComponent = (
      <DayForm
        onSubmitFunction={(values: z.infer<typeof dayFormSchema>) => {
          handleEditProgramDay(
            formProps.userId,
            formProps.dayInfo!.programId,
            formProps.dayInfo!.id,
            values.name,
            values.repeatOn,
          );
        }}
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
