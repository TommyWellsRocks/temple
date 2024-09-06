"use client";

import { TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";
import YouTubeURL from "public/content/images/workout/youtube.svg";
import { handleExerciseNoteInput } from "~/server/actions/workout/ExerciseActions";
import { useProgram } from "~/stores/ProgramStore";

function NotesTabContent() {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  let defaultValue =
    dayEx.notes?.notes ||
    "No notes for this exercise. Click here to start one!";

  return (
    <TabsContent value="notes">
      <div className="flex rounded-xl bg-secondary px-3 py-2 text-sm">
        <Textarea
          className="border-none bg-transparent"
          defaultValue={defaultValue}
          onBlur={(e) => {
            const newValue = e.target.value;
            if (newValue !== defaultValue) {
              defaultValue = newValue;
              handleExerciseNoteInput(
                dayEx.userId,
                dayEx.exerciseId,
                newValue,
                dayEx.notes?.id ? dayEx.notes?.id : undefined,
              );
            }
          }}
        />
      </div>
    </TabsContent>
  );
}

function InfoTabContent() {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  return (
    <TabsContent value="info">
      <div className="relative flex flex-col items-center rounded-xl bg-secondary px-3 py-2 text-base">
        <span className="absolute bottom-1/4">Click Me To Search</span>
        <div className="max-w-[440px]">
          <Link
            target="_blank"
            href={
              dayEx.info.video
                ? dayEx.info.video
                : `https://www.youtube.com/results?search_query=${encodeURI(`How to do a ${dayEx.info.name} exercise`)}&sp=EgIYAQ%253D%253D`
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

function MusclesTabContent() {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  return (
    <TabsContent value="muscles">
      {/* <div className="flex flex-col items-center gap-4 rounded-xl bg-secondary px-3 py-2">
        {dayEx.info.musclesImage ? (
          <Image
            src={dayEx.info.musclesImage}
            alt="Target Muscle Image"
            width={200}
            height={200}
          />
        ) : null}
      </div> */}
    </TabsContent>
  );
}

function HistoryTabContent() {
  return (
    <TabsContent value="history">
      <div className="flex rounded-xl bg-secondary px-3 py-2 text-sm"></div>
    </TabsContent>
  );
}

export function TabSelectors() {
  return (
    <div className="flex justify-center">
      <TabsList>
        <TabsTrigger value="notes">Notes</TabsTrigger>
        <TabsTrigger value="info">Info</TabsTrigger>
        <TabsTrigger value="muscles">Muscles</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
    </div>
  );
}

export function TabContents() {
  return (
    <>
      <NotesTabContent />
      <InfoTabContent />
      <MusclesTabContent />
      <HistoryTabContent />
    </>
  );
}
