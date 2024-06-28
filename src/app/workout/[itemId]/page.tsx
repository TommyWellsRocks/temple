import { WorkoutPlan } from "~/server/types";
import Nav from "../_components/Nav";
import { getWorkoutPlan } from "~/server/queries/workoutPlans";
import { getExercise } from "~/server/queries/exercises";
import LineChart from "../_components/Linechart";

export default async function WorkoutIndividual(context: any | unknown) {
  // TODO auth goes here
  // TODO change nav size
  // TODO make interactive
  // TODO create exercise notes table

  const userId = 1;
  const { itemId } = context.params as { itemId: string };
  const [planId, exerciseId] = itemId.split("-");
  if (!planId || !exerciseId) return "INVALID ID ERROR";

  const workoutPlan = (await getWorkoutPlan(
    userId,
    Number(planId),
  )) as WorkoutPlan;
  if (!workoutPlan) return "NO PLAN ERROR";
  const exercise = await getExercise(Number(exerciseId));
  if (!exercise) return "NO EXERCISE ERROR";
  const planExerciseIndex = workoutPlan.workoutItems.findIndex(
    (item) => item.exerciseId === exercise.id,
  );
  const planExercise = workoutPlan.workoutItems[planExerciseIndex]!;
  const setCount = planExercise.reps.length;

  return (
    <div className="flex flex-col gap-y-9 text-left text-xl font-medium">
      <div>Item ID: {itemId}</div>
      <div>Plan ID: {planId}</div>
      <div>Exercise ID: {exerciseId}</div>
      <Nav exerciseName={exercise.name} />

      <section className="rounded-lg bg-black bg-opacity-30 p-2">
        <LineChart page="Individual" previousData={[]} currentData={[]} />
      </section>

      <section className="flex flex-col items-center justify-center gap-y-5">
        <div className="text-sm font-light underline underline-offset-4">
          {setCount}
          {setCount === 1 ? " Set" : " Sets"}
        </div>
        <div className="flex flex-col gap-y-5">
          {planExercise.reps.map((repCount, index) => {
            return (
              <div
                className="flex items-center gap-x-3 text-2xl font-light text-gray-600"
                key={index}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center bg-gray-600 font-semibold text-gray-900"
                  style={{
                    clipPath:
                      "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                >
                  {index + 1}
                </div>
                <div className="cursor-pointer">{repCount}</div>
                <div className="text-xl">Reps</div>
                <div className="h-9 rotate-12 border border-gray-600"></div>
                <div className="cursor-pointer">
                  {planExercise.weight[index]}
                </div>
                <div className="text-xl">Pounds</div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-x-5">
          <div
            className="flex h-11 w-11 cursor-pointer items-center justify-center bg-gray-600 "
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          >
            +
          </div>
          <div
            className="flex h-11 w-11 cursor-pointer items-center justify-center bg-gray-600"
            style={{
              clipPath:
                "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
            }}
          >
            {"🗑️"}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-2 flex justify-between rounded-xl bg-black bg-opacity-40 p-0.5 text-base font-normal">
          <div className="bg-thePurple cursor-pointer rounded-xl px-5 py-1 font-medium">
            Notes
          </div>
          <div className="cursor-pointer px-3 py-1">Tips</div>
          <div className="cursor-pointer px-3 py-1">Instructions</div>
          <div className="cursor-pointer px-3 py-1">Muscles</div>
        </div>
        <div className="flex rounded-xl bg-black bg-opacity-15 px-3 py-2 text-sm">
          {"Notes here"}
        </div>
      </section>
    </div>
  );
}
