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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  handleDeleteExercise,
  handleEditExerciseName,
} from "~/server/actions/workout/DayActions";

export function ExerciseForm({
  userId,
  programId,
  dayExercise,
}: {
  userId: string;
  programId: number;
  dayExercise: {
    id: number;
    reps: number[];
    weight: number[];
    info: {
      name: string;
      id: number;
    };
    notes: {
      id: number;
      name: string | null;
    } | null;
  };
}) {
  const formSchema = z.object({
    name: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) => {
          handleEditExerciseName(
            userId,
            programId,
            dayExercise.info.id,
            values.name,
            dayExercise.notes?.id,
          );
        })}
        className="mx-auto flex w-[260px] flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rename Exercise</FormLabel>
              <FormControl>
                <Input placeholder={dayExercise.info.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <div className="flex">
            <Button
              className="mr-auto"
              variant="destructive"
              type="button"
              onClick={() => {
                handleDeleteExercise(userId, programId, dayExercise.id);
              }}
            >
              Delete
            </Button>
            <Button variant="outline" type="submit">
              Save
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}
