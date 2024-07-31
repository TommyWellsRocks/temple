"use client";

import Image from "next/image";
import { DayExercise } from "~/server/types";
import { handleExerciseNoteInput } from "~/components/workout/ServerComponents/DayExercise";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export function ExerciseTabs({ dayExercise }: { dayExercise: DayExercise }) {
  // Notes
  const haveExistingNote =
    dayExercise && dayExercise.notes && dayExercise.notes.notes;
  let notesValue = haveExistingNote
    ? dayExercise!.notes.notes
    : "No notes for this exercise. Click here to start one!";

  return (
    <Tabs defaultValue="notes">
      <div className="flex justify-center">
        <TabsList className="bg-black">
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="tips">Tips</TabsTrigger>
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="muscles">Muscles</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="notes">
        <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
          <input
            className="w-full bg-transparent"
            defaultValue={notesValue}
            onBlur={(e) => {
              let newValue = e.target.value;
              if (newValue !== notesValue) {
                notesValue = newValue;
                handleExerciseNoteInput(
                  dayExercise!,
                  newValue,
                  haveExistingNote ? dayExercise!.notes.id : undefined,
                );
              }
            }}
          />
        </div>
      </TabsContent>
      <TabsContent value="tips">
        <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
          {dayExercise!.info.tips}
        </div>
      </TabsContent>
      <TabsContent value="instructions">
        <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
          <div className="flex flex-col gap-4">
            {dayExercise!.info.instructions.map((instruction, index) => (
              <span>
                {index + 1}. {instruction}
              </span>
            ))}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="muscles">
        <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
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
      </TabsContent>
    </Tabs>
  );
}
