"use client";

import { Button } from "~/components/ui/button";
import { Flag, Zap } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { useProgram } from "~/stores/ProgramStore";

export function ActionButtons() {
  const [dayId, userId, startedWorkout, endedWorkout] = useProgram((state) => [
    state.day?.id,
    state.program?.userId,
    state.day?.startedWorkout,
    state.day?.endedWorkout,
  ]);

  const setStartWorkout = useProgram.getState().setStartWorkout;
  const setEndWorkout = useProgram.getState().setEndWorkout;

  if (
    !dayId ||
    !userId ||
    startedWorkout === undefined ||
    endedWorkout === undefined
  )
    return;
  
  const showStartButton = startedWorkout === null;
  const showEndButton = startedWorkout !== null && endedWorkout === null;

  return (
    <div className="sticky bottom-5 flex justify-end">
      {showStartButton ? (
        <Button
          className="flex gap-1"
          onClick={() => {
            setStartWorkout(userId, dayId);
          }}
        >
          <Zap width={15} /> Start Workout
        </Button>
      ) : null}

      {showEndButton ? (
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
                <div className="grid grid-cols-2 gap-2">
                  <Button className="w-full bg-white text-black">Resume</Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setEndWorkout(userId, dayId);
                    }}
                  >
                    Log Workout
                  </Button>
                </div>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : null}
    </div>
  );
}
