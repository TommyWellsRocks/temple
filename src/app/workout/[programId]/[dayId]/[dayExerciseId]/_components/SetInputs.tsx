"use client";

import { Minus, Plus } from "lucide-react";
import { clipPathParallelogram } from "~/components/ui/Shapes";
import { useProgram } from "~/hooks/workout/useProgram";
import { isFloat } from "~/utils/helpers";

function InputArea({
  index,
  value,
  changeFunc,
  label,
}: {
  index: number;
  value: number;
  changeFunc: (label: "Reps" | "Weight", index: number, value: number) => void;
  label: "Reps" | "Weight";
}) {
  return (
    <input
      id={`${crypto.randomUUID()}-${label}`}
      className={`${label === "Reps" ? "w-[3ch]" : "w-[4ch]"} cursor-pointer bg-transparent text-center text-3xl font-bold italic focus:outline-none`}
      type="number"
      inputMode="numeric"
      defaultValue={value}
      onInput={(e) => {
        if (isNaN(e.currentTarget.valueAsNumber))
          e.currentTarget.value = `${value}`;
        else if (label === "Reps" && e.currentTarget.valueAsNumber >= 2) {
          e.currentTarget.blur();
        } else if (label === "Weight" && e.currentTarget.value.length > 2)
          e.currentTarget.blur();
      }}
      onFocus={(e) => {
        e.target.select();
      }}
      onBlur={(e) => {
        // Input Actions
        let newValue = e.target.valueAsNumber;
        if (
          isNaN(newValue) ||
          newValue < 0 ||
          newValue > 999 ||
          (label === "Reps" && newValue > 20)
        ) {
          newValue = value;
          e.target.value = String(newValue);
        }

        if (isFloat(newValue)) {
          newValue = Number(newValue.toFixed(0));
          e.target.value = String(newValue);
        }

        // Update State
        changeFunc(label, index, newValue);
      }}
    />
  );
}

function InputRows({
  handleInputChangeFunc,
}: {
  handleInputChangeFunc: (
    label: "Reps" | "Weight",
    index: number,
    value: number,
  ) => void;
}) {
  const dayEx = useProgram((state) => state.dayExercise);
  if (!dayEx) return;

  return (
    <div className="flex flex-col gap-y-5 text-2xl font-light text-gray-600">
      {dayEx.reps.map((repCount, index) => {
        const weightCount = dayEx.weight[index]!;
        const isLogged = dayEx.loggedSetsCount > index;
        const isActiveSet = index === dayEx.loggedSetsCount;
        return (
          <div className="flex flex-col items-end" key={crypto.randomUUID()}>
            <div
              className={`flex items-center gap-x-2 min-[340px]:gap-x-3 ${isActiveSet ? "text-gray-200" : null}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center font-semibold ${isLogged ? "bg-gray-600 text-gray-900" : "bg-primary text-black"}`}
                style={{
                  clipPath: clipPathParallelogram,
                }}
              >
                {index + 1}
              </div>

              <InputArea
                key={crypto.randomUUID()}
                index={index}
                value={repCount}
                changeFunc={handleInputChangeFunc}
                label="Reps"
              />
              <span className="text-base">Reps</span>

              <div className="h-4 rotate-[20deg] border border-gray-800"></div>

              <InputArea
                key={crypto.randomUUID()}
                index={index}
                value={weightCount}
                changeFunc={handleInputChangeFunc}
                label="Weight"
              />
              <span className="text-base">Pounds</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EditSetButton({ method }: { method: "Add" | "Delete" }) {
  const setDayExSets = useProgram().setDayExerciseSets;

  return (
    <button
      className="flex h-11 w-11 items-center justify-center bg-primary"
      style={{
        clipPath: clipPathParallelogram,
      }}
      onClick={() => {
        setDayExSets(method);
      }}
    >
      {method === "Add" ? <Plus /> : <Minus />}
    </button>
  );
}

export function SetInputs() {
  const handleInputChange = useProgram().setDayExerciseInputs;

  return (
    <section className="flex flex-col items-center justify-center gap-y-5">
      <InputRows handleInputChangeFunc={handleInputChange} />

      <div className="mb-10 flex gap-x-10">
        <EditSetButton method="Add" />
        <EditSetButton method="Delete" />
      </div>
    </section>
  );
}
