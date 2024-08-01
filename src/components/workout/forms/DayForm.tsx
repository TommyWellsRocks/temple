"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { DialogFooter } from "~/components/ui/dialog";
import { Checkbox } from "~/components/ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  handleCreateDay,
  handleDeleteProgramDay,
  handleEditProgramDay,
} from "~/components/workout/ServerComponents/ProgramDay";

export function DayForm({
  userId,
  programId,
  groupId,
  dayInfo,
}: {
  userId: string;
  programId: number;
  groupId: number;
  dayInfo?: {
    repeatOn: number[] | null;
    name: string;
    id: number;
    userId: string;
    programId: number;
  };
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
      repeatOn: dayInfo && dayInfo.repeatOn != null ? dayInfo.repeatOn : [1],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) => {
          dayInfo
            ? handleEditProgramDay(
                userId,
                programId,
                dayInfo.id,
                values.name,
                values.repeatOn,
              )
            : handleCreateDay(
                userId,
                programId,
                groupId,
                values.name,
                values.repeatOn,
              );
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
