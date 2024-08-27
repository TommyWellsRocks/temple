"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handlePostTodaysResponse } from "~/server/actions/sheer/Actions";

const FormSchema = z.object({
  why: z.string().optional(),
});

function ResponseForm({
  userId,
  response,
}: {
  userId: string;
  response: boolean;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handlePostTodaysResponse(userId, response, data.why);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
        <FormField
          control={form.control}
          name="why"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="What happened?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="secondary" className="">
          Submit
        </Button>
      </form>
    </Form>
  );
}

function ResponseButton({
  userId,
  response,
  label,
}: {
  userId: string;
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

        <ResponseForm userId={userId} response={response} />
      </DialogContent>
    </Dialog>
  );
}

export function ResponseButtons({ userId }: { userId: string }) {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-y-8">
      <ResponseButton label="Yes" userId={userId} response={true} />
      <ResponseButton label="No" userId={userId} response={false} />
    </div>
  );
}
