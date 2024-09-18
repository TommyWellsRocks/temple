import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { useEffect, useState } from "react";

import { TabsContent, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";

import { handleExerciseNoteInput } from "~/server/actions/workout/ExerciseActions";
import Loading from "~/app/loading";
import { Button } from "~/components/ui/button";

export function NotesTab() {
  return <TabsTrigger value="notes">Notes</TabsTrigger>;
}

export function NotesTabContent() {
  const dayEx = useProgram((state) => state.dayExercise);
  const dayExNote = useProgram((state) => state.dayExercise?.notes?.notes);
  const updateDayEx = useProgram.getState().updateDayExercise;
  const [noteValue, setNoteValue] = useState("");

  const emptyDefaultText =
    "No notes for this exercise. Click here to start one!";

  useEffect(() => {
    setNoteValue(dayEx?.notes?.notes || emptyDefaultText);
  }, [dayExNote]);

  if (!dayEx) return <Loading />;

  return (
    <TabsContent value="notes">
      <div className="relative flex rounded-xl bg-secondary text-sm">
        <Textarea
          className="border-none bg-transparent"
          defaultValue={noteValue}
          onInput={(e) => setNoteValue(e.currentTarget.value)}
        />
        {noteValue !== dayExNote && noteValue !== emptyDefaultText ? (
          <Button
            variant="outline"
            className="absolute bottom-1 right-1"
            onClick={() => {
              if (dayExNote) {
                dayEx.notes.notes = noteValue;
                updateDayEx(dayEx);
              }
              handleExerciseNoteInput(
                dayEx.userId,
                dayEx.exerciseId,
                noteValue,
                dayEx.notes?.id ? dayEx.notes?.id : undefined,
              );
            }}
          >
            Save
          </Button>
        ) : null}
      </div>
    </TabsContent>
  );
}
