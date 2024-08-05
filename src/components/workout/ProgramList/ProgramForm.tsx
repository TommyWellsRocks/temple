"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { DialogFooter } from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { cn } from "~/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { WorkoutPrograms } from "~/server/types";
import {
  handleEditProgram,
  handleCreateProgram,
  handleDeleteProgram,
} from "~/server/components/workout/ProgramListActions";

const PROGRAM_ACTIVE_DAYS = 45;

export function ProgramForm({
  userId,
  programInfo,
}: {
  userId: string;
  programInfo?: WorkoutPrograms[0];
}) {
  const today = new Date();

  const formSchema = z.object({
    name: z.string().max(20, {
      message: "Program name must be less than 20 characters.",
    }),
    start: z.date(),
    end: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: programInfo ? programInfo.name : undefined,
      start: programInfo ? addDays(new Date(programInfo.startDate), 1) : today,
      end: programInfo
        ? addDays(new Date(programInfo.endDate), 1)
        : addDays(today, PROGRAM_ACTIVE_DAYS),
    },
  });

  function DatesDifference() {
    const differenceDays =
      (form.getValues().end?.getTime() - form.getValues().start?.getTime()) /
      (1000 * 3600 * 24);
    const differenceWeeks = differenceDays / 7;
    return (
      <div>
        {differenceDays.toFixed()} Days | ~ {differenceWeeks.toFixed()} Weeks
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) => {
          programInfo
            ? handleEditProgram(
                userId,
                programInfo.id,
                values.name,
                values.start,
                values.end,
              )
            : handleCreateProgram(
                userId,
                values.name,
                values.start,
                values.end,
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
                <Input placeholder="Squatober" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Program Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>Start Date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    fromDate={today}
                    toDate={form.getValues().end || undefined}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Program End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
                      ) : (
                        <span>End Date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    fromDate={form.getValues().start || today}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                <DatesDifference />
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          {!programInfo ? (
            <Button type="submit">Create</Button>
          ) : (
            <div className="flex justify-between">
              <Button
                variant="destructive"
                type="button"
                onClick={() =>
                  handleDeleteProgram(programInfo.userId, programInfo.id)
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
