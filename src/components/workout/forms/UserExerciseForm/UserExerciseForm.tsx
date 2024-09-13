"use client";

import { useSession } from "next-auth/react";
import { useMyExercises } from "~/hooks/workout/useExercises";
import { formSchema, useFormSetup } from "./useFormSetup";

import { z } from "zod";
import {
  handleCreateUserExercise,
  handleEditUserExercise,
} from "~/server/actions/workout/UserExerciseActions";

import { Form } from "~/components/ui/form";
import { NameField } from "../NameField";
import { GenericField } from "../GenericField";
import { FormButtons } from "./FormButtons";

export function UserExerciseForm({ exerciseId }: { exerciseId?: number }) {
  const userId = useSession().data?.user?.id;
  const exercise = useMyExercises()?.find((ex) => ex.id === exerciseId);
  if (!userId) return;

  const form = useFormSetup();

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const primaryMuscle = values.primaryMuscle ? values.primaryMuscle : null;
    const equipment = values.equipment ? values.equipment.split(",") : null;
    const secondaryMuscles = values.secondaryMuscles
      ? values.secondaryMuscles.split(",")
      : null;
    if (exercise) {
      handleEditUserExercise(
        userId,
        exercise.id,
        values.name,
        equipment,
        primaryMuscle,
        secondaryMuscles,
      );
    } else {
      handleCreateUserExercise(
        userId,
        values.name,
        equipment,
        primaryMuscle,
        secondaryMuscles,
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) =>
          handleSubmit(values),
        )}
        className="mx-auto flex w-[260px] flex-col gap-4"
      >
        <NameField
          control={form.control}
          placeholder={exercise?.name || "Seated Preacher Curl"}
        />

        <GenericField
          control={form.control}
          name="equipment"
          label="Equipment"
          placeholder="Dumbbells, Barbell"
        />
        <GenericField
          control={form.control}
          name="primaryMuscle"
          label="Primary Muscle"
          placeholder="Biceps"
        />
        <GenericField
          control={form.control}
          name="secondaryMuscles"
          label="Secondary Muscles"
          placeholder="None"
        />

        <FormButtons userId={userId} exercise={exercise} />
      </form>
    </Form>
  );
}
