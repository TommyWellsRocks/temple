import { WorkoutPlan } from "~/server/types";
import Nav from "../_components/Nav";
import { getWorkoutPlan } from "~/server/queries/workoutPlans";
import { getExercise } from "~/server/queries/exercises";

export default async function WorkoutIndividual(context: any | unknown) {
  // TODO auth goes here
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

  return (
    <div className="flex flex-col">
      <Nav exerciseName={exercise.name} />
      <div>Item ID: {itemId}</div>
      <div>Plan ID: {planId}</div>
      <div>Exercise ID: {exerciseId}</div>
    </div>
  );
}
