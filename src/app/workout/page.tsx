import Image from "next/image";
import Link from "next/link";
import PlanIconURL from "../../../public/content/images/workout/plan-icon.svg";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { getMyWorkoutPrograms } from "~/server/queries/workouts";
import { Navigation } from "~/components/workout/Navigation";
import { OverlayButton } from "~/components/workout/OverlayButton";
import { PopoverButton } from "~/components/workout/PopoverButton";

export default async function MyPrograms() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  const workoutPrograms = await getMyWorkoutPrograms(session.user.id);

  return (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <Navigation backURL="/" heading="Your Programs" />

      <section className="flex items-center justify-between">
        <h1>MY WORKOUT PROGRAMS GO HERE:</h1>
        <OverlayButton
          title="Create Workout Program"
          description="Build and plan your new workout program. Click create when you're done."
          formType="Program"
          formProps={{ userId: session.user.id }}
        />
      </section>

      <section>
        {!workoutPrograms.length ? (
          <div>No workout programs to show 😫</div>
        ) : (
          <div className="flex items-start gap-5">
            {workoutPrograms.map((program) => {
              return (
                <div>
                  <Link
                    href={`/workout/${program.id}`}
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
                    {program.name.slice(0, 12)}
                    <PopoverButton
                      title="Edit Workout Program"
                      description="Remember to click edit when your done."
                      formType="Program"
                      formProps={{
                        programInfo: program,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
