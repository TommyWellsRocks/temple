"use client";

import { useUser } from "~/hooks/common/useUser";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { useFormSetup, formSchema } from "./useFormSetup";

import { z } from "zod";
import {
  handleCreateDay,
  handleEditProgramDay,
} from "~/server/actions/workout/ProgramActions";

import { Form } from "~/components/ui/form";
import { NameField } from "../NameField";
import { RepeatOnField } from "./RepeatOnField";
import { FormButtons } from "./FormButtons";

import type { ProgramDay } from "~/server/types";
import Loading from "~/app/loading";

export function DayForm({
  groupId,
  dayInfo,
}: {
  groupId: number;
  dayInfo?: ProgramDay;
}) {
  const userId = useUser((state) => state.userId);
  const programId = useProgram((state) => state.program?.id);
  const form = useFormSetup(dayInfo);

  if (!userId || !programId) return <Loading />;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const newRepeatOn = values.repeatOn ?? null;

    if (dayInfo) {
      const setDayDetails = useProgram.getState().updateDay;
      dayInfo.name = values.name;
      dayInfo.repeatOn = newRepeatOn;
      setDayDetails(dayInfo);
      handleEditProgramDay(
        userId,
        programId,
        dayInfo.id,
        values.name,
        newRepeatOn,
      );
    } else {
      handleCreateDay(userId, programId, groupId, values.name, newRepeatOn);
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
        <NameField control={form.control} placeholder="Leg day" />
        <RepeatOnField control={form.control} />

        <FormButtons dayInfo={dayInfo} />
      </form>
    </Form>
  );
}
