import { WorkoutItem, workoutItemSchema } from "~/server/types";

export async function validateWorkoutItems(workoutItems: WorkoutItem[]) {
  const validWorkoutItems = []
  for (let i = 0; i <= workoutItems.length; i++) {
    const validWorkoutItem = await workoutItemSchema.safeParseAsync(
      workoutItems[i],
    );
    if (!validWorkoutItem.success) {
      return validWorkoutItem.error.errors[0]!.message
    }
    else validWorkoutItems.push(validWorkoutItem.data)
  }
  return validWorkoutItems
}
