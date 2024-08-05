"use client";

import { DayExercise } from "~/server/types";
import { handleExerciseNoteInput } from "~/server/components/workout/ExerciseActions";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/components/ui/tabs";
import { Textarea } from "~/app/components/ui/textarea";
import { MuscleCarousel } from "~/app/components/workout/MuscleCarousel";

function NotesTabContent({ dayExercise }: { dayExercise: DayExercise }) {
  const haveExistingNote =
    dayExercise && dayExercise.notes && dayExercise.notes.notes;
  let notesValue = haveExistingNote
    ? dayExercise!.notes.notes
    : "No notes for this exercise. Click here to start one!";

  return (
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
  );
}

function TipsTabContent({ tips }: { tips: string }) {
  return (
    <TabsContent value="tips">
      <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
        {tips}
      </div>
    </TabsContent>
  );
}

function InstructionsTabContent({ instructions }: { instructions: string[] }) {
  return (
    <TabsContent value="instructions">
      <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
        <div className="flex flex-col gap-4">
          {instructions.map((instruction, index) => (
            <span>
              {index + 1}. {instruction}
            </span>
          ))}
        </div>
      </div>
    </TabsContent>
  );
}

function MusclesTabContent({ muscleURLs }: { muscleURLs: string[] }) {
  return (
    <TabsContent value="muscles">
      <div className="rounded-xl bg-black bg-opacity-15 px-3 py-2">
        <MuscleCarousel muscleURLs={muscleURLs} />
      </div>
    </TabsContent>
  );
}

function TabSelectors() {
  return (
    <div className="flex justify-center">
      <TabsList className="bg-black">
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="tips">Tips</TabsTrigger>
        <TabsTrigger value="instructions">Instructions</TabsTrigger>
        <TabsTrigger value="muscles">Muscles</TabsTrigger>
      </TabsList>
    </div>
  );
}

function TabContents({ dayExercise }: { dayExercise: DayExercise }) {
  // Tips
  const tips = dayExercise!.info.tips;
  // Instructions
  const instructions = dayExercise!.info.instructions;
  // Muscles
  const muscleURLs = dayExercise!.info.targetMuscleImages
    ? dayExercise!.info.targetMuscleImages
    : [""];

  return (
    <>
      <NotesTabContent dayExercise={dayExercise} />
      <TipsTabContent tips={tips} />
      <InstructionsTabContent instructions={instructions} />
      <MusclesTabContent muscleURLs={muscleURLs} />
    </>
  );
}

export function ExerciseTabs({ dayExercise }: { dayExercise: DayExercise }) {
  return (
    <section>
      <Tabs defaultValue="notes">
        <TabSelectors />

        <TabContents dayExercise={dayExercise} />
      </Tabs>
    </section>
  );
}
