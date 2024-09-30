import { useExerciseHistory } from "~/hooks/workout/useExerciseHistory";

import { TabsContent, TabsTrigger } from "~/components/ui/tabs";
import { ScrollArea } from "~/components/ui/scroll-area";

export function HistoryTab() {
  return <TabsTrigger id="history-tab" value="history">History</TabsTrigger>;
}

export function HistoryTabContent() {
  const sessions = useExerciseHistory((state) => state.exerciseHistory);
  const hasHistory = sessions && sessions.length >= 1;

  return (
    <TabsContent value="history">
      <div
        id="history"
        className="flex max-h-96 rounded-xl bg-secondary px-3 py-2 text-sm"
      >
        {hasHistory ? (
          <ScrollArea className="w-full">
            <div className="flex flex-col gap-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="flex flex-col gap-y-1">
                  <div className="mr-2 flex items-center justify-between">
                    <span className="text-lg font-semibold">
                      {session.updatedAt.toDateString()}
                    </span>
                    <span className="rounded-xl bg-muted-foreground px-2 text-muted">
                      Completed
                    </span>
                  </div>
                  <div className="ml-2 flex flex-col gap-y-0.5 text-muted-foreground">
                    {session.reps.map((repCount, index) => (
                      <span key={index}>
                        {index + 1} - {repCount} Reps x {session.weight[index]}{" "}
                        lbs
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex w-full flex-col items-center">
            <span>No history for this exercise {":("}</span>
            <span>Make history now 🏆</span>
          </div>
        )}
      </div>
    </TabsContent>
  );
}
