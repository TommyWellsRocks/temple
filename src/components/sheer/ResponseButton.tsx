"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { WhyForm } from "./WhyForm";

export function ResponseButton({
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

        <WhyForm userId={userId} response={response} />
      </DialogContent>
    </Dialog>
  );
}
