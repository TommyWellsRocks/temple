import { useProgram } from "~/hooks/workout/useProgram";

import { TabsContent, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";

import { handleExerciseNoteInput } from "~/server/actions/workout/ExerciseActions";

export function NotesTab() {
  return <TabsTrigger value="notes">Notes</TabsTrigger>;
}

export function NotesTabContent() {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  let defaultValue =
    dayEx.notes?.notes ||
    "No notes for this exercise. Click here to start one!";

  return (
    <TabsContent value="notes">
      <div className="flex rounded-xl bg-secondary text-sm">
        <Textarea
          className="border-none bg-transparent"
          defaultValue={defaultValue}
          onBlur={(e) => {
            const newValue = e.target.value;
            if (newValue !== defaultValue) {
              defaultValue = newValue;
              handleExerciseNoteInput(
                dayEx.userId,
                dayEx.exerciseId,
                newValue,
                dayEx.notes?.id ? dayEx.notes?.id : undefined,
              );
            }
          }}
        />
      </div>
    </TabsContent>
  );
}
