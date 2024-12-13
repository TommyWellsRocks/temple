// ! !!! READ ONLY !!!

// ! DO NOT CHANGE THESE MUSCLES/NAMES.
// ! THEY ARE USED WITHIN THE DB EXERCISES AND MUSCLE IMAGES

<<<<<<< Updated upstream
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
=======
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
import Abs from "public/content/images/workout/muscles/Abs.png";
import { z } from "zod";
import { TitleCaseEquipmentEnum, TitleCaseMuscleEnum } from "~/lib/schemas/types";

export type TitleCaseMuscle = z.infer<typeof TitleCaseMuscleEnum>
>>>>>>> Stashed changes

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
  Abs: "/content/images/workout/muscles/Abs.png",
  Abductors: "/content/images/workout/muscles/Abductors.png",
  Adductors: "/content/images/workout/muscles/Adductors.png",
  Back: "/content/images/workout/muscles/Back.png",
  Biceps: "/content/images/workout/muscles/Biceps.png",
  Calves: "/content/images/workout/muscles/Calves.png",
  Chest: "/content/images/workout/muscles/Chest.png",
  Forearms: "/content/images/workout/muscles/Forearms.png",
  Glutes: "/content/images/workout/muscles/Glutes.png",
  Hamstrings: "/content/images/workout/muscles/Hamstrings.png",
  "Lower Abs": "/content/images/workout/muscles/Lower Abs.png",
  "Lower Back": "/content/images/workout/muscles/Lower Back.png",
  Neck: "/content/images/workout/muscles/Neck.png",
  Obliques: "/content/images/workout/muscles/Obliques.png",
  Quads: "/content/images/workout/muscles/Quads.png",
  Shoulders: "/content/images/workout/muscles/Shoulders.png",
  Traps: "/content/images/workout/muscles/Traps.png",
  Triceps: "/content/images/workout/muscles/Triceps.png",
  "Upper Abs": "/content/images/workout/muscles/Upper Abs.png",
};

export type TitleCaseEquipment = z.infer<typeof TitleCaseEquipmentEnum>

export const equipment = {
  rowCable: "Row Cable",
  smithMachine: "Smith Machine",
  bicepCurlMachine: "Bicep Curl Machine",
  rings: "Rings",
  foamRoller: "Foam Roller",
  freemotionMachine: "Freemotion Machine (all forms)",
  assistedWeightMachine: "Assisted Weight Machine",
  medicineBalls: "Medicine Balls",
  barbells: "Barbells",
  ropeCable: "Rope Cable",
  latPulldownCable: "Lat Pulldown Cable",
  cone: "Cone",
  rowMachine: "Row Machine",
  trapBar: "Trap Bar",
  squatMachine: "Squat Machine",
  inclineBench: "Incline Bench",
  preacherCurlMachine: "Preacher Curl Machine",
  verticalBench: "Vertical Bench (Vertical Knee Raise)",
  dipBar: "Dip (Parallel) Bar",
  bodyweightOnly: "Bodyweight-only",
  flatBench: "Flat Bench",
  thighAdductorMachine: "Thigh Adductor Machine",
  rope: "Rope",
  hackSquatMachine: "Hack Squat Machine",
  landmine: "Landmine",
  box: "Box",
  shoulderPressMachine: "Shoulder Press Machine",
  hiLoPulleyCable: "Hi-Lo Pulley Cable",
  stabilityBall: "Stability (Swiss) Ball",
  abWheel: "Ab Wheel",
  calfRaiseMachine: "Calf Raise Machine",
  gluteHamRaiseBench: "Glute Ham Raise Bench",
  handleBands: "Handle Bands",
  legPressMachine: "Leg Press Machine",
  farmersWalkHandles: "Farmer's Walk Handles",
  pvcPipe: "PVC Pipe",
  abCrunchMachine: "Ab Crunch Machine",
  tire: "Tire",
  thighAbductorMachine: "Thigh Abductor Machine",
  legPress: "Leg Press",
  paralletteBars: "Parallette Bars",
  gluteKickbackMachine: "Glute Kickback Machine",
  crossoverCable: "Crossover Cable",
  hammerstrengthMachine: "Hammerstrength (Leverage) Machine (all forms)",
  backExtensionBench: "Back Extension Bench",
  ezBar: "EZ Bar",
  declineBench: "Decline Bench",
  flyMachine: "Fly Machine",
  sled: "Sled",
  tricepsExtensionMachine: "Triceps Extension Machine",
  legCurlMachine: "Leg Curl Machine",
  battleRopes: "Battle Ropes",
  preacherCurlBench: "Preacher Curl Bench",
  balanceTrainer: "Balance Trainer",
  legExtensionMachine: "Leg Extension Machine",
  kettlebells: "Kettlebells",
  dumbbells: "Dumbbells",
  benchPressMachine: "Bench Press Machine",
  squatRack: "Squat Rack",
  miniLoopBands: "Mini Loop Bands",
  platforms: "Platforms",
  trx: "TRX",
  pullUpBar: "Pull Up Bar",
  tBar: "T Bar",
  tricepDipMachine: "Tricep Dip Machine",
  loopBands: "Loop Bands",
  reverseHyperBench: "Reverse Hyper Bench",
  shoulderShrugMachine: "Shoulder Shrug Machine",
  backExtensionMachine: "Back Extension Machine",
};
