"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import Image from "next/image";

export function TodaysMuscles({
  muscleURLS,
}: {
  muscleURLS: (string | undefined)[];
}) {
  return (
    <>
      <h3 className="pb-2">Today's Muscles</h3>
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent>
            {muscleURLS.map((muscleURL) => {
              return (
                <CarouselItem>
                  <Image
                    className="w-15 rounded-lg border border-primary bg-white p-0.5"
                    src={muscleURL ? muscleURL : "https://placehold.co/600x400"}
                    alt="Target muscle image."
                    width={100}
                    height={100}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
    </>
  );
}
