import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

function MuscleImageItem({ muscleURL }: { muscleURL: string }) {
  return (
    <CarouselItem>
      <Image
        className="w-15 rounded-lg border border-primary bg-white p-0.5"
        src={muscleURL}
        alt="Target muscle image."
        width={100}
        height={100}
      />
    </CarouselItem>
  );
}

export function MuscleCarousel({ muscleURLs }: { muscleURLs: string[] }) {
  return (
    <Carousel opts={{ dragFree: true }}>
      <CarouselContent>
        {muscleURLs.map((url) => {
          return <MuscleImageItem muscleURL={url} />;
        })}
      </CarouselContent>
    </Carousel>
  );
}
