"use client";

import { useUser } from "~/hooks/common/useUser";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { formSchema, useFormSetup } from "./useFormSetup";

import { z } from "zod";

import { Form } from "~/components/ui/form";
import { FormButtons } from "./FormButtons";
import { NameField } from "../NameField";

import type { DayExercise } from "~/server/types";
import Loading from "~/app/loading";

export function ExerciseForm({
  setOpen,
  programId,
  dayExercise,
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  programId: number;
  dayExercise: DayExercise;
}) {
  const userId = useUser((state) => state.userId);
  const updateExerciseName = useProgram.getState().updateExerciseName;
  const form = useFormSetup();
  if (!dayExercise || !userId) return <Loading />;

  const dayId = dayExercise.dayId;
  const exerciseId = dayExercise.info.id;
  const noteId = dayExercise.notes?.id;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (setOpen) setOpen(false);
    updateExerciseName(
      userId,
      programId,
      dayId,
      exerciseId,
      values.name,
      noteId,
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) =>
          handleSubmit(values),
        )}
        className="mx-auto flex w-[260px] flex-col gap-4"
      >
        <NameField control={form.control} placeholder={dayExercise.info.name} />

        <FormButtons
          userId={userId}
          programId={programId}
          dayId={dayId}
          dayExerciseId={dayExercise.id}
        />
      </form>
    </Form>
  );
}
