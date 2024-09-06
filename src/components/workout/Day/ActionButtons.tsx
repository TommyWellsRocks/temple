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
import {
  handleEndWorkout,
  handleStartWorkout,
} from "~/server/actions/workout/DayActions";
import { useState } from "react";
import { useProgram } from "~/stores/ProgramStore";

export function ActionButtons() {
  const [dayId, startedWorkout, endedWorkout, userId] = useProgram((state) => [
    state.day?.id,
    state.day?.startedWorkout,
    state.day?.endedWorkout,
    state.program?.userId,
  ]);
  if (!dayId || !startedWorkout || !endedWorkout || !userId) return;

  const [showStartButton, setShowStartButton] = useState(
    startedWorkout === null,
  );
  const [showEndButton, setShowEndButton] = useState(
    startedWorkout !== null && endedWorkout === null,
  );

  if (!showStartButton && !showEndButton) return;

  return (
    <div className="sticky bottom-5 flex justify-end">
      {showStartButton ? (
        <Button
          className="flex gap-1"
          onClick={() => {
            handleStartWorkout(userId, dayId);
            setShowStartButton(false);
            setShowEndButton(true);
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
                      setShowEndButton(false);
                      handleEndWorkout(userId, dayId);
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
