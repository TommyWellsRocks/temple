import { EditButtonPopover } from "~/components/workout/EditButtonPopover";
import { ProgramForm } from "~/components/workout/forms/ProgramForm/ProgramForm";
import { ActionCard } from "~/components/workout/ActionCard";

import type { Program } from "~/server/types";

export function ListItem({
  isDark,
  program,
}: {
  isDark: boolean;
  program: Program;
}) {
  if (!program) return;

  return (
    <ActionCard
      title={program.name}
      linkTo={`/workout/${program.id}`}
      textContent={
        <div className="flex flex-col text-sm font-light text-muted-foreground">
          <span>
            {program.startDate.toDateString()} -{" "}
            {program.endDate.toDateString()}
          </span>
        </div>
      }
      editButton={
        <EditButtonPopover
          title="Edit Workout Program"
          description="Remember to click save when your done."
          formComponent={<ProgramForm programInfo={program} />}
        />
      }
      isDark={isDark}
    />
  );
}
