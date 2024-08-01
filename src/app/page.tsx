import Link from "next/link";

export default async function Home() {
  return (
    <main className="-m-3 flex h-screen flex-col items-center justify-center gap-12 bg-gradient-to-b from-[#2e026d] to-[#15162c] text-center">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
        Welcome To <span className="text-[hsl(280,100%,70%)]">Temple</span>
      </h1>
      <Link
        className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
        href="/signin"
      >
        <h3 className="text-2xl font-bold">Sign In / Sign Up</h3>
      </Link>
    </main>
  );
}
