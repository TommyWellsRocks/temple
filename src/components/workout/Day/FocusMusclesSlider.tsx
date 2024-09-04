import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { useProgram } from "~/stores/ProgramStore";

export function FocusMusclesSlider({ dayId }: { dayId: number }) {
  const dayExercises = useProgram(
    (state) =>
      state.program?.programDays.find((day) => day.id === dayId)?.dayExercises,
  );
  if (!dayExercises) return;

  const muscleCount: { [muscle: string]: number } = {};
  dayExercises.forEach((ex) => {
    const primaryMuscle = ex.info.primaryMuscle;
    const secondaryMuscles = ex.info.secondaryMuscles;
    if (primaryMuscle) {
      muscleCount[primaryMuscle] = (muscleCount[primaryMuscle] || 0) + 1;
    }
    if (secondaryMuscles && secondaryMuscles.length >= 1) {
      secondaryMuscles.forEach((muscle) => {
        muscleCount[muscle] = (muscleCount[muscle] || 0) + 1;
      });
    }
  });

  return (
    <Carousel opts={{ dragFree: true }}>
      <CarouselContent>
        {Object.keys(muscleCount).map((muscle) => (
          <CarouselItem className="flex items-center gap-x-1" key={muscle}>
            <div className="flex gap-x-1 rounded-md bg-secondary px-2 py-1 text-base">
              <span>
                {((muscleCount[muscle]! / dayExercises.length) * 100).toFixed(
                  0,
                )}
                %
              </span>
              <span>{muscle}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
