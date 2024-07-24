"use client";

import { Minus, Plus } from "lucide-react";
import { z } from "zod";
import { handleCreateProgram } from "~/components/ServerComponents/Program";
import { handleCreateDay } from "~/components/ServerComponents/ProgramDay";
import {
  ExerciseForm,
  formSchema as exerciseFormSchema,
} from "~/components/forms/ExerciseForm";
import {
  formSchema as programFormSchema,
  ProgramForm,
} from "~/components/forms/ProgramForm";
import {
  DayForm,
  formSchema as dayFormSchema,
} from "~/components/forms/DayForm";
import {
  handleAddExercise,
  handleDeleteExercise,
} from "~/components/ServerComponents/DayExercises";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Exercises, ProgramDay } from "~/server/types";

export function OverlayButton({
  title,
  description,
  formType,
  formProps,
}: {
  title: string;
  description: string;
  formType: "Program" | "ProgramDay" | "DayExercise";
  formProps: {
    userId: string;
    programId?: number;
    dayId?: number;
    method?: "Add" | "Delete";
    programDay?: ProgramDay;
    exercises?: Exercises;
  };
}) {
  let FormComponent;

  if (formType === "Program") {
    FormComponent = (
      <ProgramForm
        onSubmitFunction={(values: z.infer<typeof programFormSchema>) =>
          handleCreateProgram(
            formProps.userId,
            values.name,
            values.start,
            values.end,
          )
        }
      />
    );
  } else if (formType === "ProgramDay") {
    FormComponent = (
      <DayForm
        onSubmitFunction={(values: z.infer<typeof dayFormSchema>) =>
          handleCreateDay(
            formProps.userId,
            formProps.programId!,
            values.name,
            values.repeatOn,
          )
        }
      />
    );
  } else if (formType === "DayExercise") {
    FormComponent = (
      <ExerciseForm
        onSubmitFunction={(values: z.infer<typeof exerciseFormSchema>) => {
          if (formProps.method === "Add") {
            handleAddExercise(
              formProps.userId,
              formProps.programId!,
              formProps.dayId!,
              Number(values.exercise),
            );
          } else {
            handleDeleteExercise(
              formProps.userId,
              formProps.programId!,
              formProps.dayId!,
              Number(values.exercise),
            );
          }
        }}
        programDay={formProps.programDay!}
        exercises={formProps.exercises!}
        method={formProps.method!}
      />
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {formProps.method === "Delete" ? <Minus /> : <Plus />}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {FormComponent}
      </DialogContent>
    </Dialog>
  );
}
