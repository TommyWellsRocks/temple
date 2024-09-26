"use client";

import { HeaderNav } from "~/components/workout/Programs/HeaderNav";
import { HeaderSection } from "~/components/workout/Programs/HeaderSection/HeaderSection";
import { ProgramsList } from "~/components/workout/Programs/ProgramsList/ProgramsList";

// * PROGRAMS PAGE

export default function Programs() {
  return (
    <>
      <HeaderNav />

      <HeaderSection />

      <ProgramsList />
    </>
  );
}
