"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { DialogFooter } from "~/components/ui/dialog";
import { Checkbox } from "~/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { ProgramDay } from "~/server/types";
import { handleDeleteProgramDay } from "~/app/workout/[programId]/_components/ServerComponents";

export const formSchema = z.object({
  name: z.string().max(20, {
    message: "Username must be less than 20 characters.",
  }),
  repeatOn: z.array(z.number()).optional(),
});

export function DayForm({
  onSubmitFunction,
  dayInfo,
}: {
  onSubmitFunction: SubmitHandler<{
    name: string;
    repeatOn?: number[] | undefined;
    start?: Date | undefined;
    end?: Date | undefined;
  }>;
  dayInfo?: ProgramDay;
}) {
  const days = [
    { day: "Sunday", id: 0 },
    { day: "Monday", id: 1 },
    { day: "Tuesday", id: 2 },
    { day: "Wednesday", id: 3 },
    { day: "Thursday", id: 4 },
    { day: "Friday", id: 5 },
    { day: "Saturday", id: 6 },
  ] as const;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: dayInfo ? dayInfo.name : undefined,
      repeatOn: dayInfo && dayInfo.repeatOn != null ? dayInfo.repeatOn : [1],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitFunction)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Leg day" {...field} className="w-2/3" />
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
              <div
                className={
                  dayInfo
                    ? "grid grid-cols-2 gap-y-2"
                    : "grid grid-cols-3 gap-y-4"
                }
              >
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
                                  ? field.onChange([
                                      ...(field.value as number[]),
                                      day.id,
                                    ])
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
          {!dayInfo ? null : (
            <Button
              className="mr-auto"
              variant={"destructive"}
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
          )}
          <Button type="submit">{dayInfo ? "Edit" : "Create"}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
