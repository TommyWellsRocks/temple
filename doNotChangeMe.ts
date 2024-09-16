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
import Abs from "public/content/images/workout/muscles/Abs.png";

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

export type TitleCaseEquipment =
  | "Row Cable"
  | "Smith Machine"
  | "Bicep Curl Machine"
  | "Rings"
  | "Foam Roller"
  | "Freemotion Machine (all forms)"
  | "Assisted Weight Machine"
  | "Medicine Balls"
  | "Barbells"
  | "Rope Cable"
  | "Lat Pulldown Cable"
  | "Cone"
  | "Row Machine"
  | "Trap Bar"
  | "Squat Machine"
  | "Incline Bench"
  | "Preacher Curl Machine"
  | "Vertical Bench (Vertical Knee Raise)"
  | "Dip (Parallel) Bar"
  | "Bodyweight-only"
  | "Flat Bench"
  | "Thigh Adductor Machine"
  | "Rope"
  | "Hack Squat Machine"
  | "Landmine"
  | "Box"
  | "Shoulder Press Machine"
  | "Hi-Lo Pulley Cable"
  | "Stability (Swiss) Ball"
  | "Ab Wheel"
  | "Calf Raise Machine"
  | "Glute Ham Raise Bench"
  | "Handle Bands"
  | "Leg Press Machine"
  | "Farmer's Walk Handles"
  | "PVC Pipe"
  | "Ab Crunch Machine"
  | "Tire"
  | "Thigh Abductor Machine"
  | "Leg Press"
  | "Parallette Bars"
  | "Glute Kickback Machine"
  | "Crossover Cable"
  | "Hammerstrength (Leverage) Machine (all forms)"
  | "Back Extension Bench"
  | "EZ Bar"
  | "Decline Bench"
  | "Fly Machine"
  | "Sled"
  | "Triceps Extension Machine"
  | "Leg Curl Machine"
  | "Battle Ropes"
  | "Preacher Curl Bench"
  | "Balance Trainer"
  | "Leg Extension Machine"
  | "Kettlebells"
  | "Dumbbells"
  | "Bench Press Machine"
  | "Squat Rack"
  | "Mini Loop Bands"
  | "Platforms"
  | "TRX"
  | "Pull Up Bar"
  | "T Bar"
  | "Tricep Dip Machine"
  | "Loop Bands"
  | "Reverse Hyper Bench"
  | "Shoulder Shrug Machine"
  | "Back Extension Machine";

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
