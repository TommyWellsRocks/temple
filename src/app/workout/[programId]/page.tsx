import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { getProgramDays } from "~/server/queries/workouts";
import Image from "next/image";
import Link from "next/link";
import PlanIconURL from "public/content/images/workout/plan-icon.svg";
import { Navigation } from "~/components/workout/Navigation";
import { OverlayButton } from "~/components/workout/OverlayButton";
import { PopoverButton } from "~/components/workout/PopoverButton";

export default async function MyProgramDays(context: any | unknown) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/signin");

  const { programId } = context.params as { programId: string };
  const programDays = await getProgramDays(session.user.id, Number(programId));

  return (
    <main className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <Navigation backURL="/workout" heading="Program Days" />

      <section className="flex items-center justify-between">
        <h1>PROGRAM DAYS HERE:</h1>
        <OverlayButton
          title="Create Day"
          description="Build and plan your new workout program. Click create when you're
            done."
          formType="ProgramDays"
          formProps={{
            userId: session.user.id,
            programId: Number(programId),
          }}
        />
      </section>

      <section>
        {!programDays.length ? (
          <div>No workout programs to show 😫</div>
        ) : (
          <div className="flex items-start gap-5">
            {programDays.map((day) => {
              return (
                <div>
                  <Link
                    href={`/workout/${programId}/${day.id}`}
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
                    {day.name.slice(0, 12)}
                    <PopoverButton
                      title="Edit Program Day"
                      description="Remember to click edit when your done."
                      formType="ProgramDays"
                      formProps={{
                        dayInfo: day,
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
