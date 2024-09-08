import { getMyPrograms } from "~/server/queries/workouts";
import { EditButtonPopover } from "~/components/workout/Common/EditButtonPopover";
import { ProgramForm } from "~/components/workout/Programs/ProgramForm";
import { ActionCard } from "~/components/workout/Common/ActionCard";

export async function ProgramsList({ userId }: { userId: string }) {
  const workoutPrograms = await getMyPrograms(userId);
  const today = new Date();

  return (
    <section className="flex flex-col gap-4">
      {workoutPrograms.map((program) => {
        const isActiveProgram =
          program.startDate <= today && program.endDate >= today;
        // const isFutureProgram = !isActiveProgram && program.startDate > today;
        // const latestGroup = program.groups[program.groups.length - 1];

        return (
          <ActionCard
            key={program.id}
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
                formComponent={
                  <ProgramForm userId={userId} programInfo={program} />
                }
              />
            }
            isDark={!isActiveProgram}
          />
        );
      })}
    </section>
  );
}
