import { CallToActionButton } from "./CallToActionButton";

export function IntroSection() {
  return (
    <section className="flex flex-col items-center gap-y-6">
      <span className="rounded-full border border-white border-opacity-25 bg-white bg-opacity-20 px-3 text-sm text-[hsl(280,100%,70%)]">
        Now Available In Beta!
      </span>

      <div className="flex flex-col text-7xl">
        <span>
          You are a <span className="text-[hsl(280,100%,70%)]">Temple</span>
        </span>
        <span className="text-[hsl(280,100%,70%)]">made for wonders.</span>
      </div>

      <div className="flex flex-col gap-y-4">
        <span className="font-light text-white text-opacity-35">
          Customize and Execute Workouts. Simply.
        </span>
        <CallToActionButton />
      </div>
    </section>
  );
}
