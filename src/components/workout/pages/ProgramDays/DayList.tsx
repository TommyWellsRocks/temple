import Image from "next/image";
import Link from "next/link";
import playButtonURL from "/public/content/images/workout/action-play.svg";
import trophyButtonURL from "/public/content/images/workout/action-trophy.svg";
import futureButtonURL from "/public/content/images/workout/action-future.svg";
import { PopoverButton } from "~/components/workout/PopoverButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { OverlayButton } from "~/components/workout/OverlayButton";
import { EditGroupsButton } from "~/components/workout/pages/ProgramDays/EditGroupsButton";
import { Program } from "~/server/types";

const DAY_NAME_MAX_LENGTH = 12;

export function DayList({
  userId,
  programId,
  program,
}: {
  userId: string;
  programId: number;
  program: Program;
}) {
  const todaysDay = new Date().getDay();
  if (!program) return;

  return (
    <Tabs defaultValue={String(program.groups[program.groups.length - 1]!.id)}>
      <div className="mb-6 grid grid-cols-3">
        <div />
        <TabsList className="justify-self-center">
          {program.groups.length > 1 ? (
            <EditGroupsButton
              userId={userId}
              programId={programId}
              groupId={program.groups[program.groups.length - 1]!.id}
            />
          ) : null}
          {program.groups.map((group, index) => (
            <TabsTrigger value={String(group.id)}>
              Sprint {index + 1}
            </TabsTrigger>
          ))}
          <EditGroupsButton userId={userId} programId={programId} />
        </TabsList>
        <div className="justify-self-end">
          <OverlayButton
            title="Create Day"
            description="Design and schedule your program days. Click create when you're done."
            formType="ProgramDays"
            formProps={{
              userId: userId,
              programId: programId,
              groupId: program.groups[program.groups.length - 1]!.id,
            }}
          />
        </div>
      </div>

      {program.groups.map((group) => (
        <TabsContent className="flex flex-col gap-5" value={String(group.id)}>
          {group.groupDays.map((day) => {
            // Has Exercises and none have undone reps
            const isDone =
              day.dayExercises.length >= 1 &&
              day.dayExercises.filter((ex) => ex.reps.includes(0)).length === 0;
            // Not done and do date isn't today
            const isFutureDay =
              !isDone &&
              day.repeatOn !== null &&
              !day.repeatOn.filter((repeatDay) => repeatDay === todaysDay);

            return (
              <div className="relative flex">
                <div className="absolute left-2.5 top-2 flex gap-1.5 px-1.5 align-middle">
                  {day.name.slice(0, DAY_NAME_MAX_LENGTH)}
                  <PopoverButton
                    title="Edit Workout Program"
                    description="Remember to click edit when your done."
                    formType="ProgramDays"
                    formProps={{ dayInfo: day }}
                  />
                </div>
                <Link
                  href={`/workout/${day.programId}/${day.id}`}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-2 ${isDone ? "bg-doneDark" : "bg-undoneDark"}`}
                >
                  <div className="mt-8 flex flex-col gap-2">
                    <div className="ml-4 flex flex-col text-base">
                      {day.dayExercises.map((exercise) => (
                        <div>
                          {exercise.reps.length} x {exercise.info.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Image
                    className="rounded-full border border-primary"
                    src={
                      isDone
                        ? trophyButtonURL
                        : isFutureDay
                          ? futureButtonURL
                          : playButtonURL
                    }
                    alt="Action."
                  />
                </Link>
              </div>
            );
          })}
        </TabsContent>
      ))}
    </Tabs>
  );
}
