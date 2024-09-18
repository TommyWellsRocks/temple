import { Tabs } from "~/components/ui/tabs";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { WeekTabDays } from "./WeekTabDays";
import { EditWeeksButton } from "./EditWeeksButton";
import { WeekTabs } from "./WeekTabs";
import { AddButtonOverlay } from "~/components/workout/AddButtonOverlay";
import { DayForm } from "~/components/workout/forms/DayForm/DayForm";
import Loading from "~/app/loading";

export function WeekTabsAndDays() {
  const programGroups = useProgram((state) => state.program?.groups);
  if (!programGroups) return <Loading />;
  const lastGroupId = programGroups[programGroups.length - 1]!.id;

  return (
    <section>
      <Tabs defaultValue={String(lastGroupId)}>
        <div className="mb-5 flex flex-col justify-between gap-2 min-[450px]:flex-row">
          <div className="min-w-[40px]" />

          <div className="mx-auto flex w-[300px] justify-between rounded-lg bg-secondary sm:w-[450px]">
            <EditWeeksButton groupId={lastGroupId} />
            <WeekTabs />
            <EditWeeksButton />
          </div>

          <div className="flex justify-end">
            <AddButtonOverlay
              title="Create Day"
              description="Design and schedule your program days. Click create when you're done."
              formComponent={<DayForm groupId={lastGroupId} />}
            />
          </div>
        </div>

        <WeekTabDays />
      </Tabs>
    </section>
  );
}
