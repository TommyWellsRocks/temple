// ! !!! READ ONLY !!!

// ! DO NOT CHANGE THESE MUSCLES/NAMES.
// ! THEY ARE USED WITHIN THE DB EXERCISES AND MUSCLE IMAGES

import Abductors from "public/content/images/workout/muscles/Abductors.png";
import Adductors from "public/content/images/workout/muscles/Adductors.png";
import Back from "public/content/images/workout/muscles/Back.png";
import Biceps from "public/content/images/workout/muscles/Biceps.png";
import Calves from "public/content/images/workout/muscles/Calves.png";
import Chest from "public/content/images/workout/muscles/Chest.png";
import Forearms from "public/content/images/workout/muscles/Forearms.png";
import Glutes from "public/content/images/workout/muscles/Glutes.png";
import Hamstrings from "public/content/images/workout/muscles/Hamstrings.png";
import LowerAbs from "public/content/images/workout/muscles/Lower Abs.png";
import LowerBack from "public/content/images/workout/muscles/Lower Back.png";
import Neck from "public/content/images/workout/muscles/Neck.png";
import Obliques from "public/content/images/workout/muscles/Obliques.png";
import Quads from "public/content/images/workout/muscles/Quads.png";
import Shoulders from "public/content/images/workout/muscles/Shoulders.png";
import Traps from "public/content/images/workout/muscles/Traps.png";
import Triceps from "public/content/images/workout/muscles/Triceps.png";
import UpperAbs from "public/content/images/workout/muscles/Upper Abs.png";
import Abs from "public/content/images/workout/muscles/Abs.png";;

export type TitleCaseMuscle =
  | "Abs"
  | "Abductors"
  | "Adductors"
  | "Back"
  | "Biceps"
  | "Calves"
  | "Chest"
  | "Forearms"
  | "Glutes"
  | "Hamstrings"
  | "Lower Abs"
  | "Lower Back"
  | "Neck"
  | "Obliques"
  | "Quads"
  | "Shoulders"
  | "Traps"
  | "Triceps"
  | "Upper Abs";

export type camelCaseMuscle =
  | "abs"
  | "abductors"
  | "adductors"
  | "back"
  | "biceps"
  | "calves"
  | "chest"
  | "forearms"
  | "glutes"
  | "hamstrings"
  | "lowerAbs"
  | "lowerBack"
  | "neck"
  | "obliques"
  | "quads"
  | "shoulders"
  | "traps"
  | "triceps"
  | "upperAbs";

export const muscles = {
  abs: "Abs",
  abductors: "Abductors",
  adductors: "Adductors",
  back: "Back",
  biceps: "Biceps",
  calves: "Calves",
  chest: "Chest",
  forearms: "Forearms",
  glutes: "Glutes",
  hamstrings: "Hamstrings",
  lowerAbs: "Lower Abs",
  lowerBack: "Lower Back",
  neck: "Neck",
  obliques: "Obliques",
  quads: "Quads",
  shoulders: "Shoulders",
  traps: "Traps",
  triceps: "Triceps",
  upperAbs: "Upper Abs",
};

export const musclesToImage = {
  Abs: Abs,
  Abductors: Abductors,
  Adductors: Adductors,
  Back: Back,
  Biceps: Biceps,
  Calves: Calves,
  Chest: Chest,
  Forearms: Forearms,
  Glutes: Glutes,
  Hamstrings: Hamstrings,
  "Lower Abs": LowerAbs,
  "Lower Back": LowerBack,
  Neck: Neck,
  Obliques: Obliques,
  Quads: Quads,
  Shoulders: Shoulders,
  Traps: Traps,
  Triceps: Triceps,
  "Upper Abs": UpperAbs,
};
