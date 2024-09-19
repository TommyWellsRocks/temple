import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import { ListItem } from "./ListItem";

export function ProgramsList() {
  const today = new Date();
  const workoutPrograms = useProgram((state) => state.programs);

  return (
    <section className="flex flex-col gap-4">
      {workoutPrograms
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .map((program) => {
          const isActiveProgram =
            program.startDate <= today && program.endDate >= today;
          // const isFutureProgram = !isActiveProgram && program.startDate > today;
          // const latestGroup = program.groups[program.groups.length - 1];

          return (
            <ListItem
              key={program.id}
              isDark={!isActiveProgram}
              program={program}
            />
          );
        })}
    </section>
  );
}
