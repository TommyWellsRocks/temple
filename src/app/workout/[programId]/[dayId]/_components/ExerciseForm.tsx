"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Exercises, ProgramDay } from "~/server/types";
import { handleAddExercise, handleDeleteExercise } from "./ServerComponents";

const FormSchema = z.object({
  exercise: z.string({
    required_error: "Please select an exercise.",
  }),
});

export function ExerciseForm({
  userId,
  programId,
  dayId,
  programDay,
  exercises,
  method,
}: {
  userId: string;
  programId: number;
  dayId: number;
  programDay: ProgramDay;
  exercises: Exercises;
  method: "Add" | "Delete";
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    method === "Add"
      ? handleAddExercise(userId, programId, dayId, Number(data.exercise))
      : handleDeleteExercise(userId, programId, dayId, Number(data.exercise));
  }
  const exerciseOptions = programDay!.dayExercises;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="exercise"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? method === "Add"
                          ? exercises.find(
                              (exercise) => String(exercise.id) === field.value,
                            )?.name
                          : exerciseOptions.find(
                              (exercise) => String(exercise.id) === field.value,
                            )?.info.name
                        : "Select exercise"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent>
                  <Command>
                    <CommandInput placeholder="Search exercise..." />
                    <CommandEmpty>No exercise found.</CommandEmpty>
                    <CommandGroup>
                      <CommandList>
                        {method === "Add"
                          ? exercises.map((exercise) => (
                              <CommandItem
                                value={exercise.name}
                                key={exercise.id}
                                onSelect={() => {
                                  form.setValue(
                                    "exercise",
                                    String(exercise.id),
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    String(exercise.id) === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {exercise.name}
                              </CommandItem>
                            ))
                          : exerciseOptions.map((exercise) => (
                              <CommandItem
                                value={exercise.info.name}
                                key={exercise.id}
                                onSelect={() => {
                                  form.setValue(
                                    "exercise",
                                    String(exercise.id),
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    String(exercise.id) === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {exercise.info.name}
                              </CommandItem>
                            ))}
                      </CommandList>
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{method}</Button>
      </form>
    </Form>
  );
}
