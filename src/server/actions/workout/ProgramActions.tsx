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
import { auth } from "~/server/auth";
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

export async function handleGetProgramDay(dayId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

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

  return await getProgramDay(dayId);
}

export async function handleCreateDay(
  programId: number,
  groupId: number,
  name: string,
  repeatOn: number[] | null,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

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

  return await createProgramDay(programId, groupId, name, repeatOn);
}

export async function handleUpdateDay(
  programId: number,
  dayId: number,
  newName: string,
  newRepeatOn: number[] | null,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

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

  return await editProgramDay(programId, dayId, newName, newRepeatOn);
}

export async function handleDeleteDay(programId: number, dayId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

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

  return await deleteProgramDay(programId, dayId);
}

export async function handleGetWeekWithDays(groupId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

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

  return await getWeekWithDays(groupId);
}

export async function handleCreateWeekWithDays(programId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { value: null, err: "Authentication error." };
  }

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

  const { value: newGroupId, err } = await createDayGroup(programId);
  if (err) return { value: newGroupId, err };

  const { err: addDaysError } = await addPrevDaysToNewGroup(
    programId,
    newGroupId!,
  );
  if (addDaysError) return { value: newGroupId, err: addDaysError };
  return { value: newGroupId, err: null };
}

export async function handleDeleteWeek(programId: number, groupId: number) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    console.error("authentication error or malicious activity");
    return { err: "Authentication error." };
  }

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

  return await deleteDayGroup(programId, groupId);
}
