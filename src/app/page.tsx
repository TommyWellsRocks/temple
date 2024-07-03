import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Welcome To <span className="text-[hsl(280,100%,70%)]">Temple</span>
        </h1>
        <div className="flex gap-x-4">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/login"
          >
            <h3 className="text-2xl font-bold">Login</h3>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/signup"
          >
            <h3 className="text-2xl font-bold">Signup</h3>
          </Link>
        </div>
      </div>
    </main>
  );
}
