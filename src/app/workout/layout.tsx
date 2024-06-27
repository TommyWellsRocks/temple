import BackButtonURL from "../../../public/content/images/back-button.svg";
import Image from "next/image";
import Link from "next/link";
import { getExercise } from "~/server/queries/exercises";
import { Exercise } from "~/server/types";

export default async function WorkoutHeader({
  children,
  context,
}: {
  children: React.ReactNode;
  context: any | unknown;
}) {
  // const isExercise = context.params.hasOwnProperty("exerciseId");
  let exercise;
  // if (isExercise) {
  //   const { exerciseId } = context.params;
  //   exercise = (await getExercise(Number(exerciseId))) as Exercise;
  // }

  return (
    <body>
      <nav className="flex items-center justify-center">
        <Link href={exercise ? "" : "/"}>
          <div>{context}</div>
          <Image className="cursor-pointer" src={BackButtonURL} alt="Back" />
        </Link>
        <div className="">{exercise ? `${exercise.name}` : "The Overview"}</div>
      </nav>
      {children}
    </body>
  );
}
