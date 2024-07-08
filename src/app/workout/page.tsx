import Image from "next/image";
import Link from "next/link";
import PlanIconURL from "../../../public/content/images/workout/plan-icon.svg";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getMyWorkouts } from "~/server/queries/workouts";
import { CreateWorkout } from "./_components/CreateWorkout";

export default async function MyWorkouts() {
  const session = await auth();
  if (!session) return redirect("/signin");

  const workouts = await getMyWorkouts(session.user!.id!);

  return (
    <main>
      <section className="flex items-center justify-between">
        <h1>WORKOUTS GO HERE:</h1>
        <CreateWorkout userId={session.user!.id!} />
      </section>

      <section>
        {workouts.length ? (
          <div className="flex items-start gap-5">
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
                  <div>{workout.name.slice(0, 12)}</div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div>No workouts to show 😫</div>
        )}
      </section>
    </main>
  );
}
