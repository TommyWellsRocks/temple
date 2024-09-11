"use client";

import { useSession } from "next-auth/react";
import { useFormSetup, formSchema } from "./useFormSetup";

import { z } from "zod";
import {
  handleEditProgram,
  handleCreateProgram,
} from "~/server/actions/workout/ProgramsActions";

import { Form, FormDescription } from "~/components/ui/form";
import { NameField } from "../NameField";
import { DateField } from "./DateField";
import { FormButtons } from "./FormButtons";

import type { Program } from "~/server/types";

export function ProgramForm({ programInfo }: { programInfo?: Program }) {
  const userId = useSession().data?.user?.id;
  if (!userId) return;

  const today = new Date();
  const form = useFormSetup(programInfo);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const startDate = new Date(values.start);
    const endDate = new Date(values.end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    programInfo
      ? handleEditProgram(
          userId,
          programInfo.id,
          values.name,
          startDate,
          endDate,
        )
      : handleCreateProgram(userId, values.name, startDate, endDate);
  };

  function DatesDifference() {
    const differenceDays =
      (form.getValues().end?.getTime() - form.getValues().start?.getTime()) /
      (1000 * 3600 * 24);
    const differenceWeeks = differenceDays / 7;
    return (
      <span>
        {differenceDays.toFixed()} Days | ~ {differenceWeeks.toFixed()} Weeks
      </span>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) =>
          handleSubmit(values),
        )}
        className="mx-auto flex w-[260px] flex-col gap-4"
      >
        <NameField control={form.control} placeholder="Squatober" />

        <DateField
          control={form.control}
          name="start"
          fieldLabel="Program Start Date"
          dateLabel="Start Date"
          fromDate={today}
          toDate={form.getValues().end || undefined}
        />

        <DateField
          control={form.control}
          name="end"
          fieldLabel="Program End Date"
          dateLabel="End Date"
          fromDate={form.getValues().start || today}
        />

        <FormDescription className="text-center">
          <DatesDifference />
        </FormDescription>

        <FormButtons userId={userId} programInfo={programInfo} />
      </form>
    </Form>
  );
}
