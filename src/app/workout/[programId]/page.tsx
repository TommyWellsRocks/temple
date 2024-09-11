"use client";

import { HeaderNav } from "~/components/workout/Program/HeaderNav";
import { WeekTabsAndDays } from "~/components/workout/Program/WeekTabsAndDays/WeekTabsAndDays";

// * DAYS PAGE

export default function Days() {
  return (
    <>
      <HeaderNav />

      <WeekTabsAndDays />
    </>
  );
}
