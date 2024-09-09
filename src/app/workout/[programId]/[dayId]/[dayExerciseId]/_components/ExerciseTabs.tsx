"use client";

import { TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import Link from "next/link";
import Image from "next/image";
import YouTube from "public/content/images/workout/youtube.svg";
import Google from "public/content/images/workout/google.png";
import { handleExerciseNoteInput } from "~/server/actions/workout/ExerciseActions";
import { useProgram } from "~/hooks/workout/useProgram";
import { ExerciseMuscleImage } from "~/utils/AllMusclesImage";

function NotesTabContent() {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  let defaultValue =
    dayEx.notes?.notes ||
    "No notes for this exercise. Click here to start one!";

  return (
    <TabsContent value="notes">
      <div className="flex rounded-xl bg-secondary text-sm">
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

  const searches = [
    {
      platform: "YouTube",
      icon: YouTube as string,
      searchUrl: `https://www.youtube.com/results?search_query=${encodeURI(`How to do a ${dayEx.info.name} exercise`)}&sp=EgIYAQ%253D%253D`,
    },
    {
      platform: "Google",
      icon: Google,
      searchUrl: `https://www.google.com/search?q=${encodeURI(`${dayEx.info.name} exercise instructions`)}`,
    },
  ];

  return (
    <TabsContent value="info">
      <div className="relative flex flex-col items-center gap-y-2 rounded-xl bg-secondary px-3 py-2 text-base min-[400px]:flex-row min-[400px]:justify-center min-[400px]:gap-x-2">
        {searches.map((search) => {
          return (
            <Link
              key={search.platform}
              target="_blank"
              href={dayEx.info.video ? dayEx.info.video : search.searchUrl}
              className="flex items-center gap-x-2 rounded-md bg-white px-2 py-1 text-black"
            >
              <span>Search {search.platform}</span>
              <Image
                src={search.icon}
                alt={`Search Exercise instructions on ${search.platform}`}
                className="w-8"
              />
            </Link>
          );
        })}
      </div>
    </TabsContent>
  );
}

function MusclesTabContent() {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  return (
    <TabsContent value="muscles">
      <div className="flex flex-col items-center gap-y-4">
        <div className="w-[200px]">
          <ExerciseMuscleImage
            primaryMuscle={dayEx.info.primaryMuscle}
            secondaryMuscles={dayEx.info.secondaryMuscles}
          />
        </div>
        <div className="flex flex-col gap-y-2 text-center text-base">
          <div className="flex gap-x-2 rounded-md bg-secondary px-2 py-1">
            <span>Primary Muscle:</span>
            <span>{dayEx.info.primaryMuscle}</span>
          </div>
          {dayEx.info.secondaryMuscles &&
          dayEx.info.secondaryMuscles.length >= 1 ? (
            <div className="flex items-start gap-x-2 rounded-md bg-muted px-2 py-1">
              <span>Secondary Muscles:</span>
              <div className="flex flex-col">
                {dayEx.info.secondaryMuscles?.map((muscle) => (
                  <span key={muscle}>{muscle}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
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
