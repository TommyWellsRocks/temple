import { useProgram } from "~/hooks/workout/useProgram/useProgram";

import Loading from "~/app/loading";

import { isFloat } from "~/utils/helpers";

import type { DayExercise } from "~/server/types";

function handleOnInput(
  e: React.FormEvent<HTMLInputElement>,
  label: "Reps" | "Weight",
  value: number,
) {
  if (isNaN(e.currentTarget.valueAsNumber)) e.currentTarget.value = `${value}`;
  else if (label === "Reps" && e.currentTarget.valueAsNumber >= 2) {
    e.currentTarget.blur();
  } else if (label === "Weight" && e.currentTarget.value.length > 2)
    e.currentTarget.blur();
}

function handleOnFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
  e.target.select();
}

function handleOnBlur(
  e: React.FocusEvent<HTMLInputElement, Element>,
  value: number,
  label: "Reps" | "Weight",
  index: number,
  dayEx: DayExercise,
) {
  const updateVolume = useProgram.getState().updateExerciseVolume;
  if (!dayEx) return <Loading />;

  // Input Actions
  let newValue = e.target.valueAsNumber;
  if (isNaN(newValue) || newValue < 0 || newValue > 999) {
    newValue = value;
    e.target.value = String(newValue);
  }

  if (isFloat(newValue)) {
    newValue = Number(newValue.toFixed(0));
    e.target.value = String(newValue);
  }

  if (
    (label === "Reps" && dayEx?.reps[index] !== newValue) ||
    (label === "Weight" && dayEx?.weight[index] !== newValue)
  ) {
    if (label === "Reps") {
      for (let i = index; i < dayEx.reps.length; i++) {
        dayEx.reps[i] = newValue;
        if (dayEx.loggedSetsCount >= i + 1) break;
      }
    } else if (label === "Weight") {
      for (let i = index; i < dayEx.weight.length; i++) {
        dayEx.weight[i] = newValue;
        if (dayEx.loggedSetsCount >= i + 1) break;
      }
    }
    // Update State
    updateVolume(
      dayEx.programId,
      dayEx.dayId,
      dayEx.id,
      dayEx.userId,
      dayEx.reps,
      dayEx.weight,
    );
  }
}

export function SetInput({
  index,
  value,
  label,
}: {
  index: number;
  value: number;
  label: "Reps" | "Weight";
}) {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return <Loading />;

  return (
    <input
      id={`${crypto.randomUUID()}-${label}`}
      className={`${label === "Reps" ? "w-[3ch]" : "w-[4ch]"} cursor-pointer bg-transparent text-center text-3xl font-bold italic focus:outline-none`}
      type="number"
      inputMode="numeric"
      defaultValue={value}
      onInput={(e) => handleOnInput(e, label, value)}
      onFocus={(e) => handleOnFocus(e)}
      onBlur={(e) => handleOnBlur(e, value, label, index, dayEx)}
    />
  );
}
