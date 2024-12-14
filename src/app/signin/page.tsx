import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";
import { signIn, providerMap, auth } from "~/server/auth";
import { AuthError } from "next-auth";

export const dynamic = "force-dynamic";

const authIcons: { name: string; icon: string }[] = [
  { name: "Google", icon: "content/images/auth/google-icon.svg" },
];

export default async function SignIn({
  searchParams,
}: {
  searchParams: { return: string };
}) {
  const session = await auth();
  const returnURL = searchParams.return || "/";
  if (session?.user?.id) return redirect(returnURL);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5">
      <div className="text-3xl font-semibold">Sign In / Sign Up</div>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider!.id}
          action={async () => {
            "use server";
            try {
              await signIn(provider!.id, { redirectTo: returnURL });
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`/?error=${error.type}`);
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
            <img
              loading="lazy"
              alt={`${provider!.name} Logo`}
              src={
                authIcons.find(
                  (authProvider) => authProvider.name === provider!.name,
                )!.icon
              }
              height={22}
              width={22}
            />
            <span>Continue with {provider!.name}</span>
          </Button>
        </form>
      ))}
    </main>
  );
}
