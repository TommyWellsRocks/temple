import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { EditButtonPopover } from "~/components/workout/Common/EditButtonPopover";
import { AddButtonOverlay } from "~/components/workout/Common/AddButtonOverlay";
import { ActionCard } from "~/components/workout/Common/ActionCard";
import { DayForm } from "~/components/workout/Program/DayForm";
import { useProgram } from "~/stores/ProgramStore";
import { Minus, Plus } from "lucide-react";

import {
  handleCreateDayGroup,
  handleDeleteDayGroup,
} from "~/server/actions/workout/ProgramActions";

export function EditGroupsButton({ groupId }: { groupId?: number }) {
  const [userId, programId] = useProgram((state) => [
    state.program?.userId,
    state.program?.id,
  ]);
  if (!userId || !programId) return;

  return (
    <button
      className="mx-1"
      onClick={() => {
        if (groupId) {
          const shouldDelete = confirm(
            "Are you sure you want to remove latest sprint? ",
          );
          if (shouldDelete) handleDeleteDayGroup(userId, programId, groupId);
        } else {
          handleCreateDayGroup(userId, programId);
        }
      }}
    >
      {groupId ? <Minus /> : <Plus />}
    </button>
  );
}

export function GroupsInfo() {
  const [userId, programId, groups] = useProgram((state) => [
    state.program?.userId,
    state.program?.id,
    state.program?.groups,
  ]);
  if (!userId || !programId || !groups) return;

  return (
    <div className="mb-5 flex flex-col justify-between gap-2 min-[450px]:flex-row">
      <div className="min-w-[40px]" />

      <div className="mx-auto flex w-[300px] justify-between rounded-lg bg-secondary sm:w-[450px]">
        <EditGroupsButton groupId={groups[groups.length - 1]!.id} />

        <TabsList>
          <Carousel opts={{ startIndex: groups.length - 1, dragFree: true }}>
            <CarouselContent className="w-[240px] sm:w-[390px]">
              {groups.map((group, index) => (
                <CarouselItem key={group.id}>
                  <TabsTrigger value={String(group.id)}>
                    Group {index + 1}
                  </TabsTrigger>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </TabsList>

        <EditGroupsButton />
      </div>

      <div className="flex justify-end">
        <AddButtonOverlay
          title="Create Day"
          description="Design and schedule your program days. Click create when you're done."
          formComponent={<DayForm groupId={groups[groups.length - 1]!.id} />}
        />
      </div>
    </div>
  );
}

export function GroupDays() {
  const groups = useProgram((state) => state.program?.groups);
  if (!groups) return;
  // const todaysDay = new Date().getDay();

  return (
    <>
      {groups.map((group) => (
        <TabsContent
          className="flex flex-col gap-y-4"
          value={String(group.id)}
          key={group.id}
        >
          {group.groupDays
            .sort((a, b) => {
              if (a.repeatOn && b.repeatOn) {
                return (
                  a.repeatOn.reduce((total, cur) => total + cur) -
                  b.repeatOn.reduce((total, cur) => total + cur)
                );
              } else {
                return a.id - b.id;
              }
            })
            .map((day) => {
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
                        <DayForm groupId={day.groupId} dayInfo={day} />
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
