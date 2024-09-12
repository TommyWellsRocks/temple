import { TabsContent } from "~/components/ui/tabs";
import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { DaysList } from "./DaysList";

export function WeekTabDays() {
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
          <DaysList groupId={group.id} />
        </TabsContent>
      ))}
    </>
  );
}
