import { redirect } from "next/navigation";
import { Buttons } from "~/components/sheer/Components";
import { Response } from "~/components/sheer/Response";
import { Navigation } from "~/components/workout/Navigation";
import { isAfter7PM } from "~/lib/utils";
import { auth } from "~/server/auth";
import { getTodaysResponse, getWinStreak } from "~/server/queries/sheer";

export default async function Sheer() {
  const session = await auth();
  if (!session || !session.user || !session.user.id)
    return redirect(`/signin?return=${encodeURIComponent("/sheer")}`);

  const now = new Date();
  const todaysResponse = isAfter7PM(now)
    ? await getTodaysResponse(session.user.id)
    : null;
  const responseReady =
    isAfter7PM(now) &&
    (todaysResponse === null || todaysResponse === undefined);
  const winStreak =
    isAfter7PM(now) && todaysResponse !== undefined
      ? await getWinStreak(session.user.id)
      : 0;

  return (
    <>
      <nav>
        <Navigation backURL="/" heading="Sheer" />
      </nav>

      <section className="flex flex-col gap-y-10 text-center">
        <div className="flex flex-col gap-y-2">
          <span className="text-3xl">Did you choose to be your best today?</span>

          <div className="flex flex-col text-base text-gray-400">
            <span>Did you love others?</span>
            <span>Did you love yourself?</span>
            <span>Are you closer to who you want to be?</span>
          </div>
        </div>

        {responseReady ? <Buttons userId={session.user.id} /> : null}
        {todaysResponse ? (
          <Response response={todaysResponse.response} winStreak={winStreak} />
        ) : null}
      </section>
    </>
  );
}
