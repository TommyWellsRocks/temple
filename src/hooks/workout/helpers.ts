import type {
  DayExercise,
  Program,
  ProgramDay,
  WorkoutPrograms,
} from "~/server/types";

export function getChangedPrograms(
  currentPrograms: WorkoutPrograms,
  programId: number,
  changedProgram: Program,
): WorkoutPrograms {
  return currentPrograms.map((program) =>
    program.id === programId ? changedProgram : program,
  );
}

// Program Days
export function getChangedProgram(
  currentProgram: Program,
  dayId: number,
  changedDay: ProgramDay,
): Program {
  return {
    ...currentProgram,
    programDays: currentProgram.programDays.map((day) =>
      day.id === dayId ? changedDay : day,
    ),
  };
}

export function getChangedDay(
  currentDay: ProgramDay,
  dayExerciseId: number,
  newExercise: DayExercise,
): ProgramDay {
  return {
    ...currentDay,
    dayExercises: currentDay.dayExercises.map((ex) =>
      ex.id === dayExerciseId ? newExercise : ex,
    ),
  };
}
