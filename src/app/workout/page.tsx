import Image from "next/image";
import Link from "next/link";
import PlanIconURL from "../../../public/content/images/workout/plan-icon.svg";
import { redirect } from "next/navigation";
import { getMyWorkouts } from "~/server/queries/workouts";
import { auth } from "~/server/auth";

export default async function MyWorkouts() {
  const session = await auth();
  if (!session?.user) return redirect("/signin");

  const workouts = await getMyWorkouts(session.user.id!);
  return (
    <div className="flex flex-col items-start">
      <h1>WORKOUTS GO HERE:</h1>
      {workouts.map((workout) => {
        return (
          <Link
            href={`/workout/${workout.id}`}
            className="flex flex-col items-center"
          >
            <Image
              src={PlanIconURL}
              priority={true}
              width={50}
              height={50}
              alt="Workout Plan Icon."
            />
            <div>{workout.name}</div>
          </Link>
        );
      })}
    </div>
  );
}
