"use client";

import { useTheme } from "next-themes";
import { Switch } from "~/components/ui/switch";
import { handleToggleRedirectWorkout } from "~/server/actions/settings/Actions";

export function DarkModeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <Switch
      id="dark-mode"
      defaultChecked={theme!.toLowerCase() === "dark"}
      onCheckedChange={(e) => {
        e ? setTheme("dark") : setTheme("light");
      }}
    />
  );
}

export function RedirectWorkoutSwitch({
  willRedirect,
}: {
  willRedirect: boolean;
}) {
  return (
    <Switch
      id="redirect-workout"
      defaultChecked={willRedirect}
      onCheckedChange={async (e) => {
        const { err } = await handleToggleRedirectWorkout(e);
        if (err) console.error(err);
      }}
    />
  );
}

export function WeightPoundsSwitch({
  isWeightInPounds,
}: {
  isWeightInPounds: boolean;
}) {
  return (
    <Switch id="weight-in-pounds" defaultChecked={isWeightInPounds} disabled />
  );
}
