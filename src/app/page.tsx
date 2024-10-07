import { HeaderNav } from "~/components/home/HeaderNav";
import { IntroSection } from "~/components/home/IntoSection";

export default async function Home() {
  return (
    <>
      <HeaderNav />
      <main className="-m-3 flex min-h-screen flex-col items-center justify-center gap-y-40 bg-gradient-to-b from-[#2e026d] to-[#15162c] px-4 text-center">
        <IntroSection />
      </main>
    </>
  );
}
