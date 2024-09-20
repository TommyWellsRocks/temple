"use client";

import { HeaderNav } from "~/components/workout/Exercise/HeaderNav";
import { Sets } from "~/components/workout/Exercise/Sets/Sets";
import { ExerciseTabs } from "~/components/workout/Exercise/ExerciseTabs/ExerciseTabs";
import { ActionButtons } from "~/components/workout/Exercise/ActionButtons/ActionButtons";

// * EXERCISE PAGE

export default function Exercise() {
  return (
    <>
      <HeaderNav />

      <div />

      <Sets />

      <ExerciseTabs />

      <ActionButtons />
    </>
  );
}
