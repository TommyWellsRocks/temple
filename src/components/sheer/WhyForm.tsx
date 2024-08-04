"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handlePostTodaysResponse } from "./ServerComponents";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

const FormSchema = z.object({
  why: z.string().optional(),
});

export function WhyForm({
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
