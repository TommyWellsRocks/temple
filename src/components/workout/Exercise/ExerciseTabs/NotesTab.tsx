import { useProgram } from "~/hooks/workout/useProgram/useProgram";
import { useEffect, useState } from "react";

import { TabsContent, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";

import Loading from "~/app/loading";
import { Button } from "~/components/ui/button";

export function NotesTab() {
  return (
    <TabsTrigger id="notes-tab" value="notes">
      Notes
    </TabsTrigger>
  );
}

export function NotesTabContent() {
  const dayEx = useProgram((state) => state.dayExercise);
  const dayExNote = useProgram((state) => state.dayExercise?.notes?.notes);
  const updateNote = useProgram.getState().updateExerciseNote;
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
          id="notes"
          className="border-none bg-transparent"
          defaultValue={noteValue}
          onInput={(e) => setNoteValue(e.currentTarget.value)}
        />
        {noteValue !== dayExNote && noteValue !== emptyDefaultText ? (
          <Button
            variant="outline"
            className="absolute bottom-1 right-1"
            onClick={() =>
              updateNote(
                dayEx.programId,
                dayEx.dayId,
                dayEx.id,
                dayEx.exerciseId,
                noteValue,
                dayEx.notes?.id,
              )
            }
          >
            Save
          </Button>
        ) : null}
      </div>
    </TabsContent>
  );
}
