import Image from "next/image";
import Link from "next/link";
import BackButtonURL from "../../../../public/content/images/back-button.svg";

export default function Nav({
  exerciseName,
  planId,
}: {
  exerciseName: string | undefined;
  planId: string | undefined;
}) {
  return (
    <nav className="flex items-center justify-between">
      <Link href={exerciseName ? `/workout/${planId}` : `/workout`}>
        <Image className="cursor-pointer" src={BackButtonURL} alt="Back" />
      </Link>
      <div className="text-2xl font-semibold">
        {exerciseName ? `${exerciseName}` : "The Overview"}
      </div>
      <div />
    </nav>
  );
}
