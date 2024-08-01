import Image from "next/image";
import Link from "next/link";
import playButtonURL from "/public/content/images/workout/action-play.svg";
import trophyButtonURL from "/public/content/images/workout/action-trophy.svg";
import futureButtonURL from "/public/content/images/workout/action-future.svg";
import { PopoverButton } from "~/components/workout/PopoverButton";
import { getMyPrograms } from "~/server/queries/workouts";

export async function ProgramsList({ userId }: { userId: string }) {
  const workoutPrograms = await getMyPrograms(userId);
  const today = new Date();

  return (
    <div className="flex flex-col gap-4">
      {workoutPrograms.map((program) => {
        const startDate = new Date(program.startDate);
        const endDate = new Date(program.endDate);
        const isActiveProgram = startDate <= today && endDate >= today;
        const isFutureProgram = !isActiveProgram && startDate > today;
        const latestGroup = program.groups[program.groups.length - 1];

        return (
          <div className="relative flex">
            <div className="absolute left-2.5 top-2 flex gap-1.5 px-1.5 align-middle">
              {program.name}
              <PopoverButton
                title="Edit Workout Program"
                description="Remember to click save when your done."
                formType="Program"
                formProps={{
                  programInfo: program,
                }}
              />
            </div>
            <Link
              href={`/workout/${program.id}`}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-2 ${isActiveProgram ? "bg-undoneDark" : "bg-doneDark"}`}
            >
              <div className="ml-4 mt-7 flex flex-wrap gap-x-2 text-base">
                {latestGroup!.groupDays.map((day) => (
                  <div>&bull; {day.name}</div>
                ))}
              </div>
              <Image
                className="rounded-full border border-primary"
                src={
                  isActiveProgram
                    ? playButtonURL
                    : isFutureProgram
                      ? futureButtonURL
                      : trophyButtonURL
                }
                alt="Action."
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
