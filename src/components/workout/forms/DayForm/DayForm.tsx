"use client";

import { useUser } from "~/hooks/common/useUser";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { useFormSetup, formSchema } from "./useFormSetup";

import { z } from "zod";

import { Form } from "~/components/ui/form";
import { NameField } from "../NameField";
import { RepeatOnField } from "./RepeatOnField";
import { FormButtons } from "./FormButtons";

import type { ProgramDay } from "~/server/types";
import Loading from "~/app/loading";

export function DayForm({
  setOpen,
  groupId,
  dayInfo,
}: {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  groupId: number;
  dayInfo?: ProgramDay;
}) {
  const userId = useUser((state) => state.userId);
  const programId = useProgram((state) => state.program?.id);
  const createDay = useProgram.getState().createDay;
  const updateDay = useProgram.getState().updateDay;
  const form = useFormSetup(dayInfo);

  if (!userId || !programId) return <Loading />;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (setOpen) setOpen(false);
    const newName = values.name;
    const newRepeatOn = values.repeatOn ?? null;

    if (dayInfo) {
      updateDay(programId, dayInfo.id, newName, newRepeatOn);
    } else {
      createDay(userId, programId, groupId, newName, newRepeatOn);
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

        <FormButtons dayInfo={dayInfo} setOpen={setOpen} />
      </form>
    </Form>
  );
}
