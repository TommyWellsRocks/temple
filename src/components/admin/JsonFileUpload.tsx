"use client";

import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { handleInsertExercises } from "~/server/actions/admin/Actions";

interface ExerciseFormat {
  name: string;
  category: string;
  muscles: string[];
  muscles_image: string;
  equipment: string[];
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
                      name: ex.name,
                      category: ex.category,
                      muscles: ex.muscles,
                      musclesImage: ex.muscles_image,
                      equipment: ex.equipment,
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
