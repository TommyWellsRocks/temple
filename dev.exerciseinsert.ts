import { readFileSync } from "fs";
import { db } from "~/server/db";
import { exercises } from "~/server/db/schema";

// * NEED TO CHANGE runtime in env.js to actual .env values

async function DEVEXERCISESINSERT() {
  const data = readFileSync("exercises.json", "utf-8");
  const jsondata: {
    name: string;
    category: string;
    muscles: string[];
    musclesImage: string;
    equipment: string[];
  }[] = JSON.parse(data);

  const formattedData = jsondata.map((ex) => ({
    name: ex.name,
    category: ex.category,
    muscles: ex.muscles,
    musclesImage: ex.musclesImage,
    equipment: ex.equipment,
  }));

  await db.insert(exercises).values(formattedData);
  console.log("DONE");
}
DEVEXERCISESINSERT();
