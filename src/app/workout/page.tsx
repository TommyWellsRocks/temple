import Image from "next/image";
import Link from "next/link";
import PlanIconURL from "../../../public/content/images/workout/plan-icon.svg";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getMyWorkouts } from "~/server/queries/workouts";
import { CreateWorkout } from "./_components/CreateWorkout";
import { EditWorkout } from "./_components/EditWorkout";

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
                <div>
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
                  </Link>
                  <div className="flex justify-center gap-1.5 align-middle">
                    {workout.name.slice(0, 12)}
                    <EditWorkout
                      userId={session.user!.id!}
                      workoutId={workout.id}
                      name={workout.name}
                      repeatStart={workout.repeatStart}
                      repeatEnd={workout.repeatEnd}
                      repeatOn={workout.repeatOn}
                    />
                  </div>
                </div>
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
