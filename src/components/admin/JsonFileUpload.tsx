"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { handleInsertExercises } from "~/server/actions/admin/Actions";

import type { TitleCaseMuscle } from "doNotChangeMe";

interface ExerciseFormat {
  id: number | null;
  name: string;
  equipment: string[];
  primaryMuscle: TitleCaseMuscle;
  secondaryMuscles: TitleCaseMuscle[];
  video: undefined;
}

export function JsonFileUpload() {
  return (
    <Card className="w-[300px]">
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2 text-sm">
          <Input
            id="file"
            type="file"
            placeholder="File"
            accept="application/json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && file.type === "application/json") {
                const reader = new FileReader();
                reader.onload = (e) => {
                  try {
                    const jsonData: ExerciseFormat[] = JSON.parse(
                      e.target?.result as string,
                    );

                    const formattedData = jsonData.map((ex) => ({
                      id: ex.id !== null ? ex.id : undefined,
                      name: ex.name,
                      equipment: ex.equipment,
                      primaryMuscle: ex.primaryMuscle,
                      secondaryMuscles: ex.secondaryMuscles,
                      video: ex.video,
                    }));
                    handleInsertExercises(formattedData);
                    console.log("DONE");
                  } catch (error) {
                    console.error("Invalid JSON file");
                  }
                };
                reader.readAsText(file);
              } else {
                console.error("Please upload a JSON file");
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
