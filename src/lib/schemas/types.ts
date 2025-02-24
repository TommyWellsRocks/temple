import { z } from "zod";

export const TitleCaseEquipmentEnum = z.enum([
  "Row Cable",
  "Smith Machine",
  "Bicep Curl Machine",
  "Rings",
  "Foam Roller",
  "Freemotion Machine (all forms)",
  "Assisted Weight Machine",
  "Medicine Balls",
  "Barbells",
  "Rope Cable",
  "Lat Pulldown Cable",
  "Cone",
  "Row Machine",
  "Trap Bar",
  "Squat Machine",
  "Incline Bench",
  "Preacher Curl Machine",
  "Vertical Bench (Vertical Knee Raise)",
  "Dip (Parallel) Bar",
  "Bodyweight-only",
  "Flat Bench",
  "Thigh Adductor Machine",
  "Rope",
  "Hack Squat Machine",
  "Landmine",
  "Box",
  "Shoulder Press Machine",
  "Hi-Lo Pulley Cable",
  "Stability (Swiss) Ball",
  "Ab Wheel",
  "Calf Raise Machine",
  "Glute Ham Raise Bench",
  "Handle Bands",
  "Leg Press Machine",
  "Farmer's Walk Handles",
  "PVC Pipe",
  "Ab Crunch Machine",
  "Tire",
  "Thigh Abductor Machine",
  "Leg Press",
  "Parallette Bars",
  "Glute Kickback Machine",
  "Crossover Cable",
  "Hammerstrength (Leverage) Machine (all forms)",
  "Back Extension Bench",
  "EZ Bar",
  "Decline Bench",
  "Fly Machine",
  "Sled",
  "Triceps Extension Machine",
  "Leg Curl Machine",
  "Battle Ropes",
  "Preacher Curl Bench",
  "Balance Trainer",
  "Leg Extension Machine",
  "Kettlebells",
  "Dumbbells",
  "Bench Press Machine",
  "Squat Rack",
  "Mini Loop Bands",
  "Platforms",
  "TRX",
  "Pull Up Bar",
  "T Bar",
  "Tricep Dip Machine",
  "Loop Bands",
  "Reverse Hyper Bench",
  "Shoulder Shrug Machine",
  "Back Extension Machine",
]);

export const TitleCaseMuscleEnum = z.enum([
  "Abs",
  "Abductors",
  "Adductors",
  "Back",
  "Biceps",
  "Calves",
  "Chest",
  "Forearms",
  "Glutes",
  "Hamstrings",
  "Lower Abs",
  "Lower Back",
  "Neck",
  "Obliques",
  "Quads",
  "Shoulders",
  "Traps",
  "Triceps",
  "Upper Abs",
]);
