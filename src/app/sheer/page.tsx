import { redirect } from "next/navigation";
import { Navigation } from "~/components/ui/Navigation";
import { isAfter7PM } from "~/utils/helpers";
import { auth } from "~/server/auth";
import {
  getTodaysResponse,
  getWinStreak,
} from "~/server/db/queries/sheer/sheer";
import { ResponseButtons } from "~/components/sheer/ResponseButtons";
import { ResponseFeedBack } from "~/components/sheer/ResponseFeedback";

export const dynamic = "force-dynamic";

export default async function Sheer() {
  const session = await auth();
  if (!session?.user?.id)
    return redirect(`/signin?return=${encodeURIComponent("/sheer")}`);

  const now = new Date();
  const { value: todaysResponse, err } = await getTodaysResponse(
    session.user.id,
  );

  if (err)
    return (
      <>
        <span>An error occurred: {err}</span>
      </>
    );

  const responseReady =
    isAfter7PM(now) &&
    (todaysResponse === null || todaysResponse === undefined);

  let winStreak = 0;
  let winStreakError: string | null = null;
  if (isAfter7PM(now) && todaysResponse !== undefined) {
    const { value, err } = await getWinStreak(session.user.id);
    if (!err && value) {
      winStreak = value;
    } else {
      winStreakError = err;
    }
  }

  return (
    <>
      <Navigation backURL="/" heading="Sheer" />

      <section className="flex flex-col gap-y-10 text-center">
        <div className="flex flex-col gap-y-2">
          <span className="text-3xl">
            Did you choose to be your best today?
          </span>

          <div className="flex flex-col text-base text-gray-400">
            <span>Did you love others?</span>
            <span>Did you love yourself?</span>
            <span>Are you closer to who you want to be?</span>
          </div>
        </div>

        {responseReady ? <ResponseButtons userId={session.user.id} /> : null}
        {winStreakError ? (
          <span>{winStreakError}</span>
        ) : todaysResponse ? (
          <ResponseFeedBack response={todaysResponse} winStreak={winStreak} />
        ) : null}
      </section>
    </>
  );
}
