"use client";

import Image from "next/image";
import React, { useRef, useState, RefObject } from "react";
import { DayExercise } from "~/server/types";
import { handleExerciseNoteInput } from "~/components/workout/ServerComponents/DayExercise";

export function ExerciseTabs({ dayExercise }: { dayExercise: DayExercise }) {
  const tabs = ["Notes", "Tips", "Instructions", "Muscles"];

  const defaultTabClass = "py-1 cursor-pointer px-3";
  const activeTabClass =
    "cursor-pointer rounded-xl bg-primary px-5 py-1 font-medium";

  const [lastTabRef, setLastTabRef] =
    useState<RefObject<HTMLDivElement> | null>(null);
  const [tab, setTab] = useState<"Notes" | "Tips" | "Instructions" | "Muscles">(
    "Notes",
  );

  function TabInfo({
    output,
  }: {
    output: "Notes" | "Tips" | "Instructions" | "Muscles";
  }) {
    if (output === "Notes") {
      const existingNote =
        dayExercise && dayExercise.notes && dayExercise.notes.notes;
      let existingValue = existingNote
        ? dayExercise!.notes.notes
        : "No notes for this exercise. Click here to start one!";

      return (
        <input
          className="w-full bg-transparent"
          defaultValue={existingValue}
          onBlur={(e) => {
            let newValue = e.target.value;
            if (newValue !== existingValue) {
              existingValue = newValue;
              handleExerciseNoteInput(
                dayExercise!,
                newValue,
                existingNote ? dayExercise!.notes.id : undefined,
              );
            }
          }}
        />
      );
    } else if (output === "Tips") {
      return <div>{dayExercise!.info.tips}</div>;
    } else if (output === "Instructions") {
      return (
        <div className="flex flex-col gap-4">
          {dayExercise!.info.instructions.map((instruction, index) => (
            <span>
              {index + 1}. {instruction}
            </span>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {dayExercise!.info.targetMuscleImages &&
            dayExercise!.info.targetMuscleImages.map((img) => (
              <Image
                className="w-15 rounded-lg border border-primary bg-white p-0.5"
                src={img}
                alt="Target muscle image."
                width={80}
                height={80}
              />
            ))}
        </div>
      );
    }
  }

  return (
    <section>
      <div className="mb-2 flex justify-between rounded-xl bg-black bg-opacity-40 p-0.5 text-base font-normal">
        {tabs.map((tabName) => {
          const ref = useRef<HTMLDivElement>(null);

          return (
            <div
              key={tabName}
              className={tab === tabName ? activeTabClass : defaultTabClass}
              ref={ref}
              onClick={() => {
                if (lastTabRef?.current) {
                  lastTabRef.current.className = defaultTabClass;
                }
                if (ref.current) {
                  ref.current.className = activeTabClass;
                }
                setTab(
                  tabName as "Notes" | "Tips" | "Instructions" | "Muscles",
                );
                setLastTabRef(ref);
              }}
            >
              {tabName}
            </div>
          );
        })}
      </div>
      <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
        <TabInfo output={tab} />
      </div>
    </section>
  );
}
