"use client";

import { useSession } from "next-auth/react";
import { formSchema, useFormSetup } from "./useFormSetup";

import { z } from "zod";
import { handleEditExerciseName } from "~/server/actions/workout/DayActions";

import { Form } from "~/components/ui/form";
import { FormButtons } from "./FormButtons";
import { NameField } from "../NameField";

import type { DayExercise } from "~/server/types";

export function ExerciseForm({
  programId,
  dayExercise,
}: {
  programId: number;
  dayExercise: DayExercise;
}) {
  const userId = useSession().data?.user?.id;
  if (!dayExercise || !userId) return;

  const form = useFormSetup();

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    handleEditExerciseName(
      userId,
      programId,
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
