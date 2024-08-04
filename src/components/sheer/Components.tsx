import { ResponseButton } from "./ResponseButton";

export function Buttons({ userId }: { userId: string }) {
  return (
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-y-8">
      <ResponseButton label="Yes" userId={userId} response={true} />
      <ResponseButton label="No" userId={userId} response={false} />
    </div>
  );
}