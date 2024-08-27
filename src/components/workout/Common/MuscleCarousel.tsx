import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

function MuscleImageItem({ muscleURL }: { muscleURL: string }) {
  return (
    <CarouselItem className="flex items-center gap-x-1">
      <Image
        className="w-15 rounded-lg border border-primary bg-white p-0.5"
        src={muscleURL}
        alt="Target muscle image."
        width={100}
        height={100}
      />
      <div className="flex flex-col items-start">
        <span className="text-base">Biceps</span>
        {/* <span className="rounded-md bg-gray-500 px-1 py-0.5 text-sm">12%</span> */}
      </div>
    </CarouselItem>
  );
}

export function MuscleCarousel({ muscleURLs }: { muscleURLs: string[] }) {
  return (
    <Carousel opts={{ dragFree: true }}>
      <CarouselContent>
        {muscleURLs.map((url, index) => {
          return <MuscleImageItem key={index} muscleURL={url} />;
        })}
      </CarouselContent>
    </Carousel>
  );
}
