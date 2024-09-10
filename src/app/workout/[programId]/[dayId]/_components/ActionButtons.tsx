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
import { useProgram } from "~/hooks/workout/useProgram";

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
            <div className="flex items-center justify-center gap-x-1 rounded-md border-2 border-primary bg-white px-4 py-1.5 text-sm text-black">
              <Flag width={15} /> Finish Workout
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Ready to log your workout?</DrawerTitle>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <div className="grid h-10 grid-cols-2 gap-2">
                  <div className="flex w-full items-center justify-center rounded-md bg-white text-sm text-black">
                    Resume
                  </div>
                  <div
                    className="flex w-full items-center justify-center rounded-md bg-primary text-sm"
                    onClick={() => {
                      setEndWorkout(userId, dayId);
                    }}
                  >
                    Log Workout
                  </div>
                </div>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : null}
    </div>
  );
}
