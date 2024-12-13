"use server";

import { ZodError } from "zod";
import {
  createProgramSchema,
  getProgramSchema,
  updateProgramSchema,
} from "~/lib/schemas/programs";
import {
  createWorkoutProgram,
  deleteWorkoutProgram,
  editWorkoutProgram,
  getMyProgram,
} from "~/server/db/queries/workout/program";

export async function handleGetProgram(userId: string, programId: number) {
  try {
    await getProgramSchema.parseAsync({
      userId,
      programId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Program validation error." };
  }

  return await getMyProgram(userId, programId);
}

export async function handleCreateProgram(
  userId: string,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  try {
    await createProgramSchema.parseAsync({
      userId,
      name,
      startDate,
      endDate,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Program validation error." };
  }

  return await createWorkoutProgram(userId, name, startDate, endDate);
}

export async function handleUpdateProgram(
  userId: string,
  programId: number,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  try {
    await updateProgramSchema.parseAsync({
      userId,
      programId,
      name,
      startDate,
      endDate,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Program validation error." };
  }

  return await editWorkoutProgram(userId, programId, name, startDate, endDate);
}

export async function handleDeleteProgram(userId: string, programId: number) {
  try {
    await getProgramSchema.parseAsync({
      userId,
      programId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Program validation error." };
  }

  return await deleteWorkoutProgram(userId, programId);
}
