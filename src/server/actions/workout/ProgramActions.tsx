"use server";

import { ZodError } from "zod";
import {
  createUpdateDaySchema,
  createWeekSchema,
  deleteDaySchema,
  deleteWeekSchema,
  getProgramDaySchema,
  getWeekSchema,
} from "~/lib/schemas/program";
import {
  createProgramDay,
  deleteProgramDay,
  editProgramDay,
  getProgramDay,
} from "~/server/db/queries/workout/day";
import {
  addPrevDaysToNewGroup,
  createDayGroup,
  deleteDayGroup,
  getWeekWithDays,
} from "~/server/db/queries/workout/groups";

export async function handleGetProgramDay(userId: string, dayId: number) {
  try {
    await getProgramDaySchema.parseAsync({
      userId,
      dayId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Program validation error." };
  }

  return await getProgramDay(userId, dayId);
}

export async function handleCreateDay(
  userId: string,
  programId: number,
  groupId: number,
  name: string,
  repeatOn: number[] | null,
) {
  try {
    await createUpdateDaySchema.parseAsync({
      userId,
      programId,
      groupId,
      name,
      repeatOn,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Program validation error." };
  }

  return await createProgramDay(userId, programId, groupId, name, repeatOn);
}

export async function handleUpdateDay(
  userId: string,
  programId: number,
  dayId: number,
  newName: string,
  newRepeatOn: number[] | null,
) {
  try {
    await createUpdateDaySchema.parseAsync({
      userId,
      programId,
      dayId,
      newName,
      newRepeatOn,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Program validation error." };
  }

  return await editProgramDay(userId, programId, dayId, newName, newRepeatOn);
}

export async function handleDeleteDay(
  userId: string,
  programId: number,
  dayId: number,
) {
  try {
    await deleteDaySchema.parseAsync({
      userId,
      programId,
      dayId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Program validation error." };
  }

  return await deleteProgramDay(userId, programId, dayId);
}

export async function handleGetWeekWithDays(userId: string, groupId: number) {
  try {
    await getWeekSchema.parseAsync({
      userId,
      groupId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Program validation error." };
  }

  return await getWeekWithDays(userId, groupId);
}

export async function handleCreateWeekWithDays(
  userId: string,
  programId: number,
) {
  try {
    await createWeekSchema.parseAsync({
      userId,
      programId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { value: null, err: err.errors.map((e) => e.message).join(", ") };
    }
    return { value: null, err: "Program validation error." };
  }

  const { value: newGroupId, err } = await createDayGroup(userId, programId);
  if (err) return { value: newGroupId, err };

  const { err: addDaysError } = await addPrevDaysToNewGroup(
    userId,
    programId,
    newGroupId!,
  );
  if (addDaysError) return { value: newGroupId, err: addDaysError };
  return { value: newGroupId, err: null };
}

export async function handleDeleteWeek(
  userId: string,
  programId: number,
  groupId: number,
) {
  try {
    await deleteWeekSchema.parseAsync({
      userId,
      programId,
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      return { err: err.errors.map((e) => e.message).join(", ") };
    }
    return { err: "Program validation error." };
  }

  return await deleteDayGroup(userId, programId, groupId);
}
