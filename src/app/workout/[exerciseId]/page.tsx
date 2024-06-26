"use client";
import { useParams } from "next/navigation";

export default function ExerciseIndividual() {
  const { exerciseId } = useParams();

  return <div className="flex flex-col">Exercise ID: {exerciseId}</div>;
}
