"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { handlePostTodaysResponse } from "~/server/actions/sheer/Actions";
import { useState } from "react";

const FormSchema = z.object({
  why: z.string().optional(),
});

function ResponseForm({ response }: { response: boolean }) {
  const [errMessage, setErrMessage] = useState("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { err } = await handlePostTodaysResponse(response, data.why);
    if (err) {
      setErrMessage(err);
    } else {
      setErrMessage("");
      form.reset();
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-y-6"
    >
      <Controller
        name="why"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="flex flex-col items-end gap-y-1">
            <div className="flex w-full items-center rounded-lg border border-neutral-500 p-2">
              <Textarea placeholder="What happened?" {...field} />
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

function ResponseButton({
  response,
  label,
}: {
  response: boolean;
  label: "Yes" | "No";
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={`${label === "Yes" ? "border-x-green-800 border-y-green-500 bg-green-600" : "border-x-red-800 border-y-red-500 bg-red-600"} w-full rounded-md border-[25px] py-28`}
        >
          {label}
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="space-y-2 text-center">
            <DialogTitle>Why?</DialogTitle>
            <DialogDescription>
              What about today made it{" "}
              {label === "Yes" ? "a success" : "a failure"}?
            </DialogDescription>
          </div>
        </DialogHeader>

        <ResponseForm response={response} />
      </DialogContent>
    </Dialog>
  );
}

export function ResponseButtons() {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-y-8">
      <ResponseButton label="Yes" response={true} />
      <ResponseButton label="No" response={false} />
    </div>
  );
}
