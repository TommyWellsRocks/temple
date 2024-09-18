import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Loading from "~/app/loading";

export function DoneButton() {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return <Loading />;

  return (
    <Link
      href={`/workout/${dayEx.programId}/${dayEx.dayId}`}
      className="mx-auto"
    >
      <Button className="flex gap-1 bg-white text-black">
        <ArrowLeft width={15} /> DONE
      </Button>
    </Link>
  );
}
