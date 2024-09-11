import { useProgram } from "~/hooks/workout/useProgram";

import Image from "next/image";
import Link from "next/link";
import { TabsContent, TabsTrigger } from "~/components/ui/tabs";

import YouTube from "public/content/images/workout/youtube.svg";
import Google from "public/content/images/workout/google.png";

export function InfoTab() {
  return <TabsTrigger value="info">Info</TabsTrigger>;
}

export function InfoTabContent() {
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
