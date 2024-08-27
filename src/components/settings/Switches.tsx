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
  userId,
  willRedirect,
}: {
  userId: string;
  willRedirect: boolean;
}) {
  return (
    <Switch
      id="redirect-workout"
      defaultChecked={willRedirect}
      onCheckedChange={(e) => handleToggleRedirectWorkout(userId, e)}
    />
  );
}

export function WeightPoundsSwitch({
  userId,
  isWeightInPounds,
}: {
  userId: string;
  isWeightInPounds: boolean;
}) {
  return (
    <Switch id="weight-in-pounds" defaultChecked={isWeightInPounds} disabled />
  );
}
