"use client"

import { render, screen } from "@testing-library/react";
import { HeaderSection } from "~/components/workout/Programs/HeaderSection";

describe("Workout/Programs", () => {
  it("Renders header and add button", () => {
    render(<HeaderSection />); // Render

    const header = screen.getByText(/Your Programs/i); // Get

    // Act

    expect(header).toBeInTheDocument(); // Assert
  });
});
