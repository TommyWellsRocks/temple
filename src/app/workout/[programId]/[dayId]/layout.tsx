import { SetDay } from "~/hooks/workout/useProgram/actions/day";

export default function DayLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { dayId: string };
}) {
  return (
    <>
      <SetDay dayId={Number(params.dayId)} />
      {children}
    </>
  );
}
