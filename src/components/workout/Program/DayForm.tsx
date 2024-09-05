"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { DialogFooter } from "~/components/ui/dialog";
import { Checkbox } from "~/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  handleCreateDay,
  handleDeleteProgramDay,
  handleEditProgramDay,
} from "~/server/actions/workout/ProgramActions";
import { useProgram } from "~/stores/ProgramStore";
import type { ProgDay } from "~/server/types";

export function DayForm({
  groupId,
  dayInfo,
}: {
  groupId: number;
  dayInfo?: ProgDay
}) {
  const [userId, programId] = useProgram((state) => [
    state.program?.userId,
    state.program?.id,
  ]);
  if (!userId || !programId) return;

  const days = [
    { day: "Sunday", id: 0 },
    { day: "Monday", id: 1 },
    { day: "Tuesday", id: 2 },
    { day: "Wednesday", id: 3 },
    { day: "Thursday", id: 4 },
    { day: "Friday", id: 5 },
    { day: "Saturday", id: 6 },
  ] as const;

  const formSchema = z.object({
    name: z.string().max(20, {
      message: "Day name must be less than 20 characters.",
    }),
    repeatOn: z.array(z.number()).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: dayInfo ? dayInfo.name : undefined,
      repeatOn: dayInfo?.repeatOn != null ? dayInfo.repeatOn : [1],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) => {
          const newRepeatOn = values.repeatOn ?? null;
          if (dayInfo) {
            const setDayDetails = useProgram.getState().setDayDetails;
            setDayDetails(dayInfo.id, values.name, newRepeatOn);
            handleEditProgramDay(
              userId,
              programId,
              dayInfo.id,
              values.name,
              newRepeatOn,
            );
          } else {
            handleCreateDay(
              userId,
              programId,
              groupId,
              values.name,
              newRepeatOn,
            );
          }
        })}
        className="mx-auto flex w-[260px] flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Leg day" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeatOn"
          render={() => (
            <FormItem>
              <FormLabel>Repeat</FormLabel>
              <div className="grid grid-cols-2 gap-y-3">
                {days.map((day) => (
                  <FormField
                    key={day.id}
                    control={form.control}
                    name="repeatOn"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={day.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(day.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value!, day.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== day.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {day.day}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          {!dayInfo ? (
            <Button type="submit">Create</Button>
          ) : (
            <div className="flex">
              <Button
                className="mr-auto"
                variant="destructive"
                type="button"
                onClick={() =>
                  handleDeleteProgramDay(
                    dayInfo.userId,
                    dayInfo.programId,
                    dayInfo.id,
                  )
                }
              >
                Delete
              </Button>
              <Button variant="outline" type="submit">
                Save
              </Button>
            </div>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}
