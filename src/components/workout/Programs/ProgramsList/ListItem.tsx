import { ActionCard } from "~/components/workout/ActionCard";
import { EditButton } from "../../EditProgramButton";

import type { Program } from "~/server/types";

export function ListItem({
  isDark,
  program,
}: {
  isDark: boolean;
  program: Program;
}) {
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
      editButton={<EditButton program={program} />}
      isDark={isDark}
      id="program"
    />
  );
}
