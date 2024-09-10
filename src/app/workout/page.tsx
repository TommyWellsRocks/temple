"use client";

import { Navigation } from "~/components/ui/Navigation";
import { ProgramsList } from "./_components/ProgramsList/ProgramsList";
import { HeaderSection } from "./_components/HeaderSection";

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
