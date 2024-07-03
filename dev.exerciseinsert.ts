import { readFileSync } from "fs";
import { db } from "~/server/db";
import { exercises } from "~/server/db/schema";

// * NEED TO CHANGE runtime in env.js to actual .env values

function DEVEXERCISESINSERT() {
  const data = readFileSync("exercises.json", "utf-8");
  const jsondata = JSON.parse(data);

  jsondata.forEach(async (ex: any) => {
    await db.insert(exercises).values({
      id: ex.id,
      name: ex.name,
      category: ex.category,
      primaryMuscles: ex.primary_muscles,
      secondaryMuscles: ex.secondary_muscles,
      instructions: ex.instructions,
      tips: ex.tips,
      isSingleArmBased: ex.is_single_arm_based,
      isSingleLegBased: ex.is_single_leg_based,
      targetMuscleImages: ex.target_muscle_images,
      images: ex.images,
      videos: ex.videos,
    });
  });
}
DEVEXERCISESINSERT();