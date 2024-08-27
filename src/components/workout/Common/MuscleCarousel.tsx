import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";

function MuscleItem({
  dayExercise,
}: {
  dayExercise: {
    info: {
      primaryMuscle: string | null;
      secondaryMuscles: string[] | null;
    };
  };
}) {
  return (
    <CarouselItem className="flex items-center gap-x-1">
      {/* <Image
        className="w-15 rounded-lg border border-primary bg-white p-0.5"
        src={muscleURL}
        alt="Target muscle image."
        width={100}
        height={100}
      /> */}
      <div className="flex flex-col items-start">
        <span className="text-base">{dayExercise.info.primaryMuscle}</span>
        {/* <span className="rounded-md bg-gray-500 px-1 py-0.5 text-sm">12%</span> */}
      </div>
    </CarouselItem>
  );
}

export function MuscleCarousel({
  dayExercises,
}: {
  dayExercises: {
    info: {
      id: number;
      primaryMuscle: string | null;
      secondaryMuscles: string[] | null;
    };
  }[];
}) {
  return (
    <Carousel opts={{ dragFree: true }}>
      <CarouselContent>
        {dayExercises.map((dayEx) => {
          return <MuscleItem key={dayEx.info.id} dayExercise={dayEx} />;
        })}
      </CarouselContent>
    </Carousel>
  );
}
