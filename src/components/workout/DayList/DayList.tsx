import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { EditButtonPopover } from "~/components/workout/EditButtonPopover";
import { AddButtonOverlay } from "~/components/workout/AddButtonOverlay";
import { EditGroupsButton } from "~/components/workout/DayList/EditGroupsButton";
import { ActionCard } from "~/components/workout/ActionCard";
import { DayForm } from "~/components/workout/DayList/DayForm";
import type { Program } from "~/server/types";

function GroupList({
  userId,
  programId,
  program,
}: {
  userId: string;
  programId: number;
  program: Program;
}) {
  if (!program) return;

  return (
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
              <CarouselItem key={group.id}>
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
  );
}

function GroupsInfo({
  userId,
  programId,
  program,
}: {
  userId: string;
  programId: number;
  program: Program;
}) {
  if (!program) return;

  return (
    <div className="mb-5 flex flex-col justify-between gap-2 min-[450px]:flex-row">
      <div className="min-w-[40px]" />

      <GroupList userId={userId} programId={programId} program={program} />

      <div className="flex justify-end">
        <AddButtonOverlay
          title="Create Day"
          description="Design and schedule your program days. Click create when you're done."
          formComponent={
            <DayForm
              userId={userId}
              programId={programId}
              groupId={program.groups[program.groups.length - 1]!.id}
            />
          }
        />
      </div>
    </div>
  );
}

function GroupDays({ program }: { program: Program }) {
  // const todaysDay = new Date().getDay();

  return (
    <>
      {program!.groups.map((group) => (
        <TabsContent
          className="flex flex-col gap-y-4"
          value={String(group.id)}
          key={group.id}
        >
          {group.groupDays.map((day) => {
            const isDone =
              day.startedWorkout !== null && day.endedWorkout !== null;
            // Not done and do date isn't today
            // const isFutureDay =
            //   !isDone &&
            //   day.repeatOn !== null &&
            //   !day.repeatOn.filter((repeatDay) => repeatDay === todaysDay);

            return (
              <ActionCard
                key={day.id}
                title={day.name}
                editButton={
                  <EditButtonPopover
                    title="Edit Program Day"
                    description="Remember to click save when your done."
                    formComponent={
                      <DayForm
                        userId={day.userId}
                        programId={day.programId}
                        groupId={day.groupId}
                        dayInfo={day}
                      />
                    }
                  />
                }
                isDark={isDone}
                linkTo={`/workout/${day.programId}/${day.id}`}
              />
            );
          })}
        </TabsContent>
      ))}
    </>
  );
}

export function DayList({
  userId,
  programId,
  program,
}: {
  userId: string;
  programId: number;
  program: Program;
}) {
  if (!program) return;

  return (
    <section>
      <Tabs
        defaultValue={String(program.groups[program.groups.length - 1]!.id)}
      >
        <GroupsInfo userId={userId} programId={programId} program={program} />

        <GroupDays program={program} />
      </Tabs>
    </section>
  );
}
