import { Flag } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { ResumeButton } from "./ResumeButton";
import { LogWorkoutButton } from "./LogWorkoutButton";

export function EndWorkoutDrawer() {
  return (
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
          <DrawerClose asChild>
            <div className="grid h-10 grid-cols-2 gap-2">
              <ResumeButton />
              <LogWorkoutButton />
            </div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
