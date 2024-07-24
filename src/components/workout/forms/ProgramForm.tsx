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
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { DialogFooter } from "~/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { WorkoutPrograms } from "~/server/types";
import { handleDeleteProgram } from "~/components/workout/ServerComponents/Program";

export const formSchema = z.object({
  name: z.string().max(20, {
    message: "Program name must be less than 20 characters.",
  }),
  start: z.date(),
  end: z.date(),
});

export function ProgramForm({
  onSubmitFunction,
  programInfo,
}: {
  onSubmitFunction: SubmitHandler<{
    name: string;
    start: Date;
    end: Date;
  }>;
  programInfo?: WorkoutPrograms[0];
}) {
  const today = new Date();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: programInfo ? programInfo.name : undefined,
      start:
        programInfo && programInfo.repeatStart != null
          ? new Date(programInfo.repeatStart)
          : today,
      end:
        programInfo && programInfo.repeatEnd != null
          ? new Date(programInfo.repeatEnd)
          : addDays(today, 45),
    },
  });

  function DaysAndWeeks() {
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
                <Input placeholder="Squatober" {...field} className="w-2/3" />
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
                        "w-2/3 justify-start text-left font-normal",
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
                <PopoverContent className="w-auto p-0" align="start">
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
                        "w-2/3 justify-start text-left font-normal",
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
                <PopoverContent className="w-auto p-0" align="start">
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
                <DaysAndWeeks />
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          {!programInfo ? (
            <Button type="submit">Create</Button>
          ) : (
            <>
              <Button
                className="mr-auto"
                variant={"destructive"}
                type="button"
                onClick={() =>
                  handleDeleteProgram(programInfo.userId, programInfo.id)
                }
              >
                Delete
              </Button>
              <Button variant={"secondary"} type="submit">
                Edit
              </Button>
            </>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}
