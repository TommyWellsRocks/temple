import { Button } from "~/components/ui/button";
import { Flag, Zap } from "lucide-react";
import type { ProgramDay } from "~/server/types";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

export function ActionButtons({ programDay }: { programDay: ProgramDay }) {
  const isStartReady = programDay?.dayExercises.filter((ex) =>
    ex.reps.includes(0),
  ).length;

  return (
    <div className="sticky bottom-5 flex justify-end">
      {isStartReady ? (
        <Button className="flex gap-1">
          <Zap width={15} /> Start Workout
        </Button>
      ) : (
        <Drawer nested>
          <DrawerTrigger>
            <Button className="flex gap-1 border-2 border-primary bg-white text-black">
              <Flag width={15} /> Finish Workout
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Ready to log your workout?</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <div className="flex gap-2">
                  <Button className="w-full bg-white text-black">Resume</Button>
                  <Button className="w-full">Log Workout</Button>
                </div>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
