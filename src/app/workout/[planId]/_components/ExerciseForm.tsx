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
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Exercises } from "~/server/types";
import { handleAddExercise, handleDeleteExercise } from "./ServerComponents";

const FormSchema = z.object({
  exercise: z.string({
    required_error: "Please select an exercise.",
  }),
});

export function ExerciseForm({
  userId,
  workoutId,
  exercises,
  method,
}: {
  userId: string;
  workoutId: number;
  exercises: Exercises;
  method: "Add" | "Delete";
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    method === "Add"
      ? handleAddExercise(userId, workoutId, Number(data.exercise))
      : handleDeleteExercise(userId, workoutId, Number(data.exercise));
  }

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
                        " justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? exercises.find(
                            (exercise) => String(exercise.id) === field.value,
                          )?.name
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
                        {exercises.map((exercise) => (
                          <CommandItem
                            className=""
                            value={exercise.name}
                            key={exercise.id}
                            onSelect={() => {
                              form.setValue("exercise", String(exercise.id));
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
