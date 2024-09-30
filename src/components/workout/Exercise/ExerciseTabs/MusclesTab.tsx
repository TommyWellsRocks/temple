import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { TabsContent, TabsTrigger } from "~/components/ui/tabs";
import { FullMusclesImage } from "~/components/workout/AllMusclesImage";

import type { TitleCaseMuscle } from "doNotChangeMe";
import Loading from "~/app/loading";

export function MusclesTab() {
  return <TabsTrigger id="muscles-tab" value="muscles">Muscles</TabsTrigger>;
}

export function MusclesTabContent() {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return <Loading />;

  return (
    <TabsContent value="muscles">
      <div    id="muscles" className="flex flex-col items-center gap-y-4">
        <div className="w-[200px]">
          <FullMusclesImage
            primaryMuscle={dayEx.info.primaryMuscle as TitleCaseMuscle | null}
            secondaryMuscles={dayEx.info.secondaryMuscles as TitleCaseMuscle[] | null}
          />
        </div>
        <div className="flex flex-col gap-y-2 text-center text-base">
          <div className="flex gap-x-2 rounded-md bg-secondary px-2 py-1">
            <span>Primary Muscle:</span>
            <span>{dayEx.info.primaryMuscle}</span>
          </div>
          {dayEx.info.secondaryMuscles &&
          dayEx.info.secondaryMuscles.length >= 1 ? (
            <div className="flex items-start gap-x-2 rounded-md bg-muted px-2 py-1">
              <span>Secondary Muscles:</span>
              <div className="flex flex-col">
                {dayEx.info.secondaryMuscles?.map((muscle) => (
                  <span key={muscle}>{muscle}</span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </TabsContent>
  );
}
