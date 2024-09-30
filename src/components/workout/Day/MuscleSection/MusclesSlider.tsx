import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { getMuscleCount } from "./getMuscleCount";
import Loading from "~/app/loading";

export function MuscleSlider() {
  const dayExercises = useProgram((state) => state.day?.dayExercises);
  if (!dayExercises) return <Loading />;

  const muscleCount = getMuscleCount(dayExercises);

  return (
    <Carousel opts={{ dragFree: true }}>
      <CarouselContent>
        {muscleCount.map(([muscle, count]) => (
          <CarouselItem className="flex items-center gap-x-1" key={muscle}>
            <div id="muscle-percent-focus" className="flex gap-x-1 rounded-md bg-secondary px-2 py-1 text-base">
              <span>{((count / dayExercises.length) * 100).toFixed(0)}%</span>
              <span>{muscle}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
