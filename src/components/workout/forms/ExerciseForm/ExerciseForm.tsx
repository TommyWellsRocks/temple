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
  programId,
  dayExercise,
}: {
  programId: number;
  dayExercise: DayExercise;
}) {
  const userId = useUser((state) => state.userId);
  const updateExerciseName = useProgram.getState().updateExerciseName;
  const form = useFormSetup();
  if (!dayExercise || !userId) return <Loading />;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    updateExerciseName(
      userId,
      programId,
      dayExercise.dayId,
      dayExercise.info.id,
      values.name,
      dayExercise.notes?.id,
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
          dayExerciseId={dayExercise.id}
        />
      </form>
    </Form>
  );
}
