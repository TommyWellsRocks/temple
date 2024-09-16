"use client";

import { useSession } from "next-auth/react";
import { useMyExercises } from "~/hooks/workout/useExercises";
import { formSchema, useFormSetup } from "./useFormSetup";

import { z } from "zod";
import {
  handleCreateUserExercise,
  handleEditUserExercise,
} from "~/server/actions/workout/UserExerciseActions";
import { equipment, muscles, TitleCaseMuscle } from "doNotChangeMe";

import { Form } from "~/components/ui/form";
import { NameField } from "../NameField";
import { FormButtons } from "./FormButtons";
import { SelectField } from "../SelectField";

export function UserExerciseForm({ exerciseId }: { exerciseId?: number }) {
  const userId = useSession().data?.user?.id;
  const exercise = useMyExercises()?.find((ex) => ex.id === exerciseId);
  const form = useFormSetup();

  if (!userId) return;

  const equipmentOptions = Object.values(equipment).map((eq) => ({
    label: eq,
    value: eq,
  }));
  const muscleOptions = Object.values(muscles).map((muscle) => ({
    label: muscle,
    value: muscle,
  }));

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const equipment = values.equipment ? values.equipment : null;
    const primaryMuscle = values.primaryMuscle
      ? (values.primaryMuscle as TitleCaseMuscle)
      : null;
    const secondaryMuscles = values.secondaryMuscles
      ? (values.secondaryMuscles as TitleCaseMuscle[])
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
        className="flex flex-col gap-4"
      >
        <NameField
          control={form.control}
          placeholder={exercise?.name || "Seated Preacher Curl"}
        />

        <SelectField
          control={form.control}
          name="equipment"
          label="Equipment"
          placeholder="Select equipment"
          items={equipmentOptions}
          isMulti
        />

        <SelectField
          control={form.control}
          name="primaryMuscle"
          label="Primary Muscle"
          placeholder="Select muscle"
          items={muscleOptions}
        />

        <SelectField
          control={form.control}
          name="secondaryMuscles"
          label="Secondary Muscles"
          placeholder="Select muscle(s)"
          items={muscleOptions}
          isMulti
        />

        <FormButtons userId={userId} exercise={exercise} />
      </form>
    </Form>
  );
}
