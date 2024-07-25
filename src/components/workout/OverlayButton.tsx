"use client";

import { Minus, Plus } from "lucide-react";
import { ExerciseForm } from "~/components/workout/forms/ExerciseForm";
import { ProgramForm } from "~/components/workout/forms/ProgramForm";
import { DayForm } from "~/components/workout/forms/DayForm";
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
} & (
  | {
      formType: "Program";
      formProps: {
        userId: string;
      };
    }
  | {
      formType: "ProgramDays";
      formProps: {
        userId: string;
        programId: number;
      };
    }
  | {
      formType: "Exercise";
      formProps: {
        programDay: ProgramDay;
        exercises: Exercises;
        method: "Add" | "Delete";
      };
    }
)) {
  let FormComponent;

  if (formType === "Program") {
    FormComponent = <ProgramForm userId={formProps.userId} />;
  } else if (formType === "ProgramDays") {
    FormComponent = <DayForm userId={formProps.userId} programId={formProps.programId} />;
  } else if (formType === "Exercise") {
    FormComponent = (
      <ExerciseForm
        programDay={formProps.programDay}
        exercises={formProps.exercises}
        method={formProps.method}
      />
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {formType === "Exercise" && formProps.method === "Delete" ? (
            <Minus />
          ) : (
            <Plus />
          )}
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
