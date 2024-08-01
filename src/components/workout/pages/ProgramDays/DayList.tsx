import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import playButtonURL from "/public/content/images/workout/action-play.svg";
import trophyButtonURL from "/public/content/images/workout/action-trophy.svg";
import futureButtonURL from "/public/content/images/workout/action-future.svg";
import { PopoverButton } from "~/components/workout/PopoverButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { OverlayButton } from "~/components/workout/OverlayButton";
import { EditGroupsButton } from "~/components/workout/pages/ProgramDays/EditGroupsButton";
import { Program } from "~/server/types";
import { InfoContainer } from "../../InfoContainer";

const DAY_EXERCISE_MAX_LENGTH = 3;

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
      <div className="flex flex-col justify-between gap-2 min-[450px]:flex-row">
        <div className="min-w-[40px]" />

        <div className="mx-auto flex w-[300px] justify-between rounded-lg bg-secondary sm:w-[450px]">
          {program.groups.length > 1 ? (
            <EditGroupsButton
              userId={userId}
              programId={programId}
              groupId={program.groups[program.groups.length - 1]!.id}
            />
          ) : (
            <div />
          )}

          <TabsList>
            <Carousel
              opts={{ startIndex: program.groups.length - 1, dragFree: true }}
            >
              <CarouselContent className="w-[240px] sm:w-[390px]">
                {program.groups.map((group, index) => (
                  <CarouselItem>
                    <TabsTrigger value={String(group.id)}>
                      Group {index + 1}
                    </TabsTrigger>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </TabsList>

          <EditGroupsButton userId={userId} programId={programId} />
        </div>

        <div className="flex justify-end">
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
              <InfoContainer
                title={day.name}
                editButton={
                  <PopoverButton
                    title="Edit Workout Program"
                    description="Remember to click edit when your done."
                    formType="ProgramDays"
                    formProps={{ dayInfo: day }}
                  />
                }
                items={day.dayExercises
                  .map((exercise) => (
                    <div>
                      {exercise.reps.length} x {exercise.info.name}
                    </div>
                  ))
                  .slice(0, DAY_EXERCISE_MAX_LENGTH)}
                isDark={isDone}
                actionIconURL={
                  isDone
                    ? trophyButtonURL
                    : isFutureDay
                      ? futureButtonURL
                      : playButtonURL
                }
                linkTo={`/workout/${day.programId}/${day.id}`}
              />
            );
          })}
        </TabsContent>
      ))}
    </Tabs>
  );
}
