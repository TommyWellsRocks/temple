import type { DayExercise } from "~/server/types";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft, CheckCheck } from "lucide-react";

export function ActionButtons({ dayExercise }: { dayExercise: DayExercise }) {
  const isDone = !dayExercise?.reps.includes(0);

  return (
    <div className="sticky bottom-5 flex justify-between">
      {isDone ? (
        <Link href={`/workout/${dayExercise?.dayId}`} className="mx-auto">
          <Button className="flex gap-1 bg-white text-black">
            <ArrowLeft width={15} /> DONE
          </Button>
        </Link>
      ) : (
        <>
          <div className="w-[42px]" />
          <Button className="w-2/3" variant={"secondary"}>
            Log Set
          </Button>
          <Button className="rounded-full px-2" variant={"outline"}>
            <CheckCheck />
          </Button>
        </>
      )}
    </div>
  );
}
