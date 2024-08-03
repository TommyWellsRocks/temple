"use client";

import Image from "next/image";
import { DayExercise } from "~/server/types";
import { handleExerciseNoteInput } from "~/components/workout/ServerComponents/DayExercise";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

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
          <Textarea
            className="border-none bg-transparent"
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
        <div className="rounded-xl bg-black bg-opacity-15 px-3 py-2">
          <Carousel opts={{ dragFree: true }}>
            <CarouselContent>
              {dayExercise!.info.targetMuscleImages &&
                dayExercise!.info.targetMuscleImages.map((img) => {
                  return (
                    <CarouselItem>
                      <Image
                        className="w-15 rounded-lg border border-primary bg-white p-0.5"
                        src={img}
                        alt="Target muscle image."
                        width={100}
                        height={100}
                      />
                    </CarouselItem>
                  );
                })}
            </CarouselContent>
          </Carousel>
        </div>
      </TabsContent>
    </Tabs>
  );
}
