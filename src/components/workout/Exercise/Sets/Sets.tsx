import { SetRows } from "./SetRows";
import { EditSetButton } from "./EditSetButton";

export function Sets() {
  return (
    <section className="flex flex-col items-center justify-center gap-y-5">
      <SetRows />

      <div className="mb-10 flex gap-x-10">
        <EditSetButton method="Add" />
        <EditSetButton method="Delete" />
      </div>
    </section>
  );
}
