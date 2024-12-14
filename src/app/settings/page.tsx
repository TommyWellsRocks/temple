import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import { getUserSettings } from "~/server/db/queries/settings/settings";
import { Navigation } from "~/components/ui/Navigation";
import {
  DarkModeSwitch,
  RedirectWorkoutSwitch,
  WeightPoundsSwitch,
} from "~/components/settings/Switches";

export const dynamic = "force-dynamic";

function SettingsItem({
  label,
  switchComponent,
}: {
  label: string;
  switchComponent: JSX.Element;
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-x-4">
      <span className="text-lg">{label}</span>
      {switchComponent}
    </div>
  );
}

export default async function Settings() {
  const session = await auth();
  if (!session?.user?.id)
    return redirect(`/signin?return=${encodeURIComponent("/settings")}`);

  const userId = session.user.id;
  const { value: userSettings, err: settingsError } =
    await getUserSettings(userId);
  if (!userSettings || settingsError) return;

  return (
    <>
      <Navigation backURL="/" heading="Settings" />
      <div className="flex flex-col items-center gap-y-4">
        <SettingsItem label="Dark Mode" switchComponent={<DarkModeSwitch />} />

        <SettingsItem
          label="Redirect Workout"
          switchComponent={
            <RedirectWorkoutSwitch
              userId={userId}
              willRedirect={userSettings.redirectOnLoadWorkout}
            />
          }
        />

        <div className="grid grid-cols-2 gap-x-4 text-gray-400">
          <span className="text-lg">Weight Measure</span>
          <div className="flex items-center gap-x-2 text-sm">
            <span>KGs</span>
            <WeightPoundsSwitch
              userId={userId}
              isWeightInPounds={userSettings.weightInPounds}
            />
            <span>LBs</span>
          </div>
        </div>
      </div>
    </>
  );
}
