"use client";

import type { DayExercise } from "~/server/types";
import { handleExerciseNoteInput } from "~/server/components/workout/ExerciseActions";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";
import YouTubeURL from "public/content/images/workout/youtube.svg";

function NotesTabContent({ dayExercise }: { dayExercise: DayExercise }) {
  const haveExistingNote = Boolean(
    dayExercise?.notes?.notes,
  );
  let notesValue = haveExistingNote
    ? dayExercise!.notes.notes
    : "No notes for this exercise. Click here to start one!";

  return (
    <TabsContent value="notes">
      <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
        <Textarea
          className="border-none bg-transparent"
          defaultValue={notesValue!}
          onBlur={(e) => {
            const newValue = e.target.value;
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

function InfoTabContent({
  instructionVideo,
  exerciseName,
}: {
  instructionVideo: string | null;
  exerciseName: string;
}) {
  return (
    <TabsContent value="info">
      <div className="relative flex flex-col items-center rounded-xl bg-black bg-opacity-15 px-3 py-2 text-base">
        <span className="absolute bottom-1/4">Click Me To Search</span>
        <div className="max-w-[440px]">
          <Link
            target="_blank"
            href={
              instructionVideo
                ? instructionVideo
                : `https://www.youtube.com/results?search_query=${encodeURI(`How to do a ${exerciseName} exercise`)}&sp=EgIYAQ%253D%253D`
            }
          >
            <Image
              src={YouTubeURL as string}
              alt="Exercise instructional video"
              className="rounded-xl"
            />
          </Link>
        </div>
      </div>
    </TabsContent>
  );
}

function MusclesTabContent({
  muscleURL,
  muscles,
}: {
  muscleURL: string | null;
  muscles: string[] | null;
}) {
  return (
    <TabsContent value="muscles">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-black bg-opacity-15 px-3 py-2">
        {muscleURL ? (
          <Image
            src={muscleURL}
            alt="Target Muscle Image"
            width={200}
            height={200}
          />
        ) : null}
      </div>
    </TabsContent>
  );
}

function HistoryTabContent() {
  return (
    <TabsContent value="history">
      <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
      </div>
    </TabsContent>
  );
}

function TabSelectors() {
  return (
    <div className="flex justify-center">
      <TabsList className="bg-black">
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger value="muscles">Muscles</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
    </div>
  );
}

function TabContents({ dayExercise }: { dayExercise: DayExercise }) {
  return (
    <>
      <NotesTabContent dayExercise={dayExercise} />
      <InfoTabContent
        instructionVideo={dayExercise!.info.video}
        exerciseName={dayExercise!.info.name}
      />
      <MusclesTabContent
        muscleURL={dayExercise!.info.musclesImage}
        muscles={dayExercise!.info.muscles}
      />
      <HistoryTabContent />
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
