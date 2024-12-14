"use client";

import { handleInsertExercises } from "~/server/actions/admin/Actions";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { ExerciseFormat, FormattedJsonExercise } from "~/server/types";
import { Button } from "../ui/button";

function getFileData(
  file: File,
): Promise<
  { value: null; err: string } | { value: FormattedJsonExercise[]; err: null }
> {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsedJson: ExerciseFormat[] = JSON.parse(
          reader.result as string,
        );

        const formattedData = parsedJson.map((ex) => ({
          id: ex.id !== null ? ex.id : undefined,
          name: ex.name,
          equipment: ex.equipment,
          primaryMuscle: ex.primaryMuscle,
          secondaryMuscles: ex.secondaryMuscles,
          video: ex.video,
        }));
        resolve({ value: formattedData, err: null });
      } catch (err: any) {
        resolve({ value: null, err: "Failed to parse file" });
      }
    };

    reader.onerror = () => {
      resolve({ value: null, err: "Error reading the file" });
    };

    reader.readAsText(file);
  });
}

const FormSchema = z.object({
  file: z
    .instanceof(File)
    .refine((f) => f.type === "application/json")
    .refine(
      async (f) => {
        const { err } = await getFileData(f);
        if (err) return false;
        return true;
      },
      { message: "Invalid file data." },
    ),
});

export function JsonFileUpload() {
  const [errMessage, setErrMessage] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { value: fileData, err } = await getFileData(data.file);
    if (err) {
      setErrMessage(err);
    } else {
      const { err: insertError } = await handleInsertExercises(fileData!);
      if (insertError) setErrMessage(insertError);
      else {
        setErrMessage("");
        form.reset();
      }
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col items-start gap-y-2 "
    >
      <Controller
        name="file"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col items-end gap-y-1">
            <div className="flex w-full items-center rounded-lg border border-neutral-500 p-2">
              <input
                name="file"
                type="file"
                accept="application/json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  field.onChange(file);
                }}
              />
            </div>
            {fieldState.error || errMessage ? (
              <span className="rounded-md bg-slate-700 px-2 py-1 font-medium text-red-500">
                {fieldState.error ? fieldState.error.message : errMessage}
              </span>
            ) : null}
          </div>
        )}
      />

      <Button type="submit" variant="secondary" className="">
        Submit
      </Button>
    </form>
  );
}
