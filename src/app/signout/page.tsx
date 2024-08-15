import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";
import { auth, signOut } from "~/server/auth";

export const dynamic = "force-dynamic"

export default async function SignIn() {
  const session = await auth();
  if (!session?.user?.id)
    return redirect(`/signin?return=${encodeURIComponent("/signout")}`);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <span className="text-3xl font-semibold">Sign Out</span>
      <div className="flex flex-col items-center gap-1 text-center text-sm">
        <span>Are you sure you want to go?</span>
        <span>We are going to miss you a lot!!!</span>
      </div>
      <video src="content/videos/auth/bye_gif.mp4" autoPlay loop muted>
        Your browser does not support this video {" :("}. That&apos;s too bad!
        It&apos;s a really good video!
      </video>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <Button variant="outline" className="gap-2 text-base" type="submit">
          <span>Sign Out</span>
        </Button>
      </form>
    </main>
  );
}
