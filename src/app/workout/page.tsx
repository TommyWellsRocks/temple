"use client";

import { Navigation } from "~/components/ui/Navigation";
import { ProgramsList } from "~/components/workout/Programs/ProgramsList/ProgramsList";
import { HeaderSection } from "~/components/workout/Programs/HeaderSection";

// * PROGRAMS PAGE

export default function Programs() {
  return (
    <>
      <Navigation backURL="/" heading="Temple" />

      <HeaderSection />

      <ProgramsList />
    </>
  );
}
