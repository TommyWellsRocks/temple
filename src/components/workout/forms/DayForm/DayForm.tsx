"use client";

import { useProgram } from "~/hooks/workout/useProgram";

import { z } from "zod";
import { useFormSetup, formSchema } from "./useFormSetup";
import {
  handleCreateDay,
  handleEditProgramDay,
} from "~/server/actions/workout/ProgramActions";

import { Form } from "~/components/ui/form";
import { NameField } from "../NameField";
import { RepeatOnField } from "./RepeatOnField";
import { FormButtons } from "./FormButtons";

import type { ProgramDay } from "~/server/types";

export function DayForm({
  groupId,
  dayInfo,
}: {
  groupId: number;
  dayInfo?: ProgramDay;
}) {
  const [userId, programId] = useProgram((state) => [
    state.program?.userId,
    state.program?.id,
  ]);
  if (!userId || !programId) return;

  const form = useFormSetup(dayInfo);

  const handleSubmit = (values: z.infer<typeof formSchema>, dayId?: number) => {
    const newRepeatOn = values.repeatOn ?? null;

    if (dayId) {
      const setDayDetails = useProgram.getState().setDayDetails;
      setDayDetails(dayId, values.name, newRepeatOn);
      handleEditProgramDay(userId, programId, dayId, values.name, newRepeatOn);
    } else {
      handleCreateDay(userId, programId, groupId, values.name, newRepeatOn);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) =>
          handleSubmit(values, dayInfo ? dayInfo.id : undefined),
        )}
        className="mx-auto flex w-[260px] flex-col gap-4"
      >
        <NameField control={form.control} placeholder="Leg day" />
        <RepeatOnField control={form.control} />

        <FormButtons dayInfo={dayInfo} />
      </form>
    </Form>
  );
}
