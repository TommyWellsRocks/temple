"use client";

import { useSession } from "next-auth/react";
import { useFormSetup, formSchema } from "./useFormSetup";

import { useState } from "react";
import { z } from "zod";
import {
  handleEditProgram,
  handleCreateProgram,
} from "~/server/actions/workout/ProgramsActions";

import { Form, FormDescription } from "~/components/ui/form";
import { NameField } from "../NameField";
import { DateField } from "./DateField";
import { FormButtons } from "./FormButtons";

import type { WorkoutPrograms } from "~/server/types";
import { addDays } from "date-fns";

const PROGRAM_ACTIVE_DAYS = 45;

export function ProgramForm({
  programInfo,
}: {
  programInfo?: WorkoutPrograms[0];
}) {
  const userId = useSession().data?.user?.id;
  if (!userId) return;

  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(
    addDays(startDate, PROGRAM_ACTIVE_DAYS),
  );
  const form = useFormSetup(startDate, endDate, programInfo);

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

  function DatesDifference({
    endDateTime,
    startDateTime,
  }: {
    endDateTime: number;
    startDateTime: number;
  }) {
    const differenceDays = (endDateTime - startDateTime) / (1000 * 3600 * 24);
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
          fromDate={startDate}
          toDate={endDate}
          setter={setStartDate}
        />

        <DateField
          control={form.control}
          name="end"
          fieldLabel="Program End Date"
          dateLabel="End Date"
          fromDate={startDate}
          setter={setEndDate}
        />

        <FormDescription className="text-center">
          <DatesDifference
            startDateTime={startDate.getTime()}
            endDateTime={endDate.getTime()}
          />
        </FormDescription>

        <FormButtons userId={userId} programInfo={programInfo} />
      </form>
    </Form>
  );
}
