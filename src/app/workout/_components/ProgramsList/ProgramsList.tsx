import { useMyPrograms } from "~/hooks/workout/useMyPrograms";
import { ListItem } from "./ListItem";

export async function ProgramsList() {
  const today = new Date();
  const workoutPrograms = useMyPrograms()!;

  return (
    <section className="flex flex-col gap-4">
      {workoutPrograms.map((program) => {
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
