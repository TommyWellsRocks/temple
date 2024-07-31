import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";
import { signIn, providerMap, auth } from "~/server/auth";
import googleIconURL from "public/content/images/auth/google-icon.svg";
import Image from "next/image";
import { AuthError } from "next-auth";

const authIcons: { name: string; icon: string }[] = [
  { name: "Google", icon: googleIconURL },
];

export default async function SignIn({
  searchParams,
}: {
  searchParams: { return: string };
}) {
  const session = await auth();
  const returnURL = searchParams.return || "/workout";
  if (session && session.user && session.user.id) return redirect(returnURL);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <div className="text-3xl font-semibold">Sign In / Sign Up</div>
      {Object.values(providerMap).map((provider) => (
        <form
          action={async () => {
            "use server";
            try {
              await signIn(provider!.id, { redirectTo: returnURL });
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`/workout?error=${error.type}`);
              }

              // Otherwise if a redirects happens NextJS can handle it
              // so you can just re-thrown the error and let NextJS handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error;
            }
          }}
        >
          <Button variant="outline" className="gap-2 text-base" type="submit">
            <Image
              alt={`${provider!.name} Logo`}
              src={
                authIcons.find(
                  (authProvider) => authProvider.name === provider!.name,
                )!.icon
              }
              height={22}
            />
            <span>Continue with {provider!.name}</span>
          </Button>
        </form>
      ))}
    </main>
  );
}
