import { readFileSync } from "fs";
import { db } from "~/server/db";
import { exercises } from "~/server/db/schema";

// * NEED TO CHANGE runtime in env.js to actual .env values

async function DEVEXERCISESINSERT() {
  const data = readFileSync("exercises.json", "utf-8");
  const jsondata: {
    name: string;
    equipment: string;
    primary_muscles: string[];
    secondary_muscles: string[];
    instructions: string[];
  }[] = JSON.parse(data);

  const formattedData = jsondata.map((ex) => ({
    name: ex.name,
    primaryMuscles: ex.primary_muscles,
    secondaryMuscles: ex.secondary_muscles,
    instructions: ex.instructions,
    equipment: ex.equipment,
    tips: "Slow Form Then Add Weight When You Can. Don't go too heavy without proper form.",
  }));

  await db.insert(exercises).values(formattedData);
  console.log("DONE")
}
DEVEXERCISESINSERT();

//  target_muscle_images?
