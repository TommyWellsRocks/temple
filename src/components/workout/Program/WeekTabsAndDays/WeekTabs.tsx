import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";

export function WeekTabs() {
  const weeks = useProgram((state) => state.program?.groups)!;
  const latestWeek = weeks.length - 1;

  return (
    <TabsList>
      <Carousel opts={{ startIndex: latestWeek, dragFree: true }}>
        <CarouselContent className="w-[240px] sm:w-[390px]">
          {weeks.map((week, index) => (
            <CarouselItem key={week.id}>
              <TabsTrigger value={String(week.id)}>
                Week {index + 1}
              </TabsTrigger>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </TabsList>
  );
}
