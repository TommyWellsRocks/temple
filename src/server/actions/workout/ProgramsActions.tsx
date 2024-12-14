"use server";

import { ZodError } from "zod";
import {
  createProgramSchema,
  getProgramSchema,
  updateProgramSchema,
} from "~/lib/schemas/programs";
import { auth } from "~/server/auth";
import {
  createWorkoutProgram,
  deleteWorkoutProgram,
  editWorkoutProgram,
  getMyProgram,
} from "~/server/db/queries/workout/program";

export async function handleGetProgram(programId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

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

  return await getMyProgram(programId);
}

export async function handleCreateProgram(
  name: string,
  startDate: Date,
  endDate: Date,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

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

  return await createWorkoutProgram(name, startDate, endDate);
}

export async function handleUpdateProgram(
  programId: number,
  name: string,
  startDate: Date,
  endDate: Date,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

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

  return await editWorkoutProgram(programId, name, startDate, endDate);
}

export async function handleDeleteProgram(programId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

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

  return await deleteWorkoutProgram(programId);
}
