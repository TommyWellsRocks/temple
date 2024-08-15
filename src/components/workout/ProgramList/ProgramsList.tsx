import { getMyPrograms } from "~/server/queries/workouts";
import { ActionCard } from "~/components/workout/ActionCard";
import { EditButtonPopover } from "~/components/workout/EditButtonPopover";
import { ProgramForm } from "~/components/workout/ProgramList/ProgramForm";

export async function ProgramsList({ userId }: { userId: string }) {
  const workoutPrograms = await getMyPrograms(userId);
  const today = new Date();

  return (
    <section className="flex flex-col gap-4">
      {workoutPrograms.map((program) => {
        const isActiveProgram = program.startDate <= today && program.endDate >= today;
        // const isFutureProgram = !isActiveProgram && program.startDate > today;
        // const latestGroup = program.groups[program.groups.length - 1];

        return (
          <ActionCard
            key={program.id}
            title={program.name}
            editButton={
              <EditButtonPopover
                title="Edit Workout Program"
                description="Remember to click save when your done."
                formComponent={
                  <ProgramForm userId={userId} programInfo={program} />
                }
              />
            }
            isDark={!isActiveProgram}
            linkTo={`/workout/${program.id}`}
          />
        );
      })}
    </section>
  );
}
