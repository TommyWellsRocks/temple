import playButtonURL from "/public/content/images/workout/action-play.svg";
import trophyButtonURL from "/public/content/images/workout/action-trophy.svg";
import futureButtonURL from "/public/content/images/workout/action-future.svg";
import { getMyPrograms } from "~/server/queries/workouts";
import { InfoContainer } from "../../InfoContainer";
import { PopoverButton } from "../../PopoverButton";

const PROGRAM_DAY_MAX_LENGTH = 3;

export async function ProgramsList({ userId }: { userId: string }) {
  const workoutPrograms = await getMyPrograms(userId);
  const today = new Date();

  return (
    <div className="flex flex-col gap-4">
      {workoutPrograms.map((program) => {
        const startDate = new Date(program.startDate);
        const endDate = new Date(program.endDate);
        const isActiveProgram = startDate <= today && endDate >= today;
        const isFutureProgram = !isActiveProgram && startDate > today;
        const latestGroup = program.groups[program.groups.length - 1];

        return (
          <InfoContainer
            title={program.name}
            editButton={
              <PopoverButton
                title="Edit Workout Program"
                description="Remember to click save when your done."
                formType="Program"
                formProps={{
                  programInfo: program,
                }}
              />
            }
            items={latestGroup!.groupDays.map((day) => (
              <div>&bull; {day.name}</div>
            )).slice(0, PROGRAM_DAY_MAX_LENGTH)}
            isDark={!isActiveProgram}
            actionIconURL={
              isActiveProgram
                ? playButtonURL
                : isFutureProgram
                  ? futureButtonURL
                  : trophyButtonURL
            }
            linkTo={`/workout/${program.id}`}
          />
        );
      })}
    </div>
  );
}
