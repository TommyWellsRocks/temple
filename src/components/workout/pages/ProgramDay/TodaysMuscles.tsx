"use client";

import Image from "next/image";

export async function TodaysMuscles({
  muscleURLS,
}: {
  muscleURLS: (string | undefined)[];
}) {
  return (
    <>
      <h3 className="pb-2">Today's Muscles</h3>
      <div className="flex gap-x-3.5">
        {muscleURLS.map((muscleURL) => {
          return (
            <Image
              className="w-15 rounded-lg border border-primary bg-white p-0.5"
              src={muscleURL ? muscleURL : "https://placehold.co/600x400"}
              alt="Target muscle image."
              width={80}
              height={80}
            />
          );
        })}
      </div>
    </>
  );
}
