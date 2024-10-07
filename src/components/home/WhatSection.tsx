import { BarChart, Blocks, NotebookPen } from "lucide-react";
import { SectionDescription } from "./SectionDescription";

export function WhatSection() {
  const whatItems = [
    {
      name: "Build",
      icon: <Blocks />,
      description:
        "Design and schedule your workouts. Choose from over 4000 exercises, or make your own, for your custom split.",
      img: "",
    },
    {
      name: "Record",
      icon: <NotebookPen />,
      description: "Log your weight and reps for each set.",
      img: "",
    },
    {
      name: "Track",
      icon: <BarChart />,
      description:
        "Watch your session history stack up and see your results over time.",
      img: "",
    },
  ];

  return (
    <section className="flex flex-col items-center gap-y-6" id="what">
      <SectionDescription text="What Is It?" />
      <span className="text-3xl">Your Workouts In One Place</span>
      <div className="flex flex-wrap justify-center gap-3">
        {whatItems.map((item, index) => (
          <div
            key={index}
            className="flex w-[300px] flex-col items-start gap-y-3 rounded-lg border border-white border-opacity-40 bg-white bg-opacity-10 px-4 py-4 text-start
        font-light"
          >
            <div className="flex items-center gap-x-2">
              {item.icon}
              <span>{item.name}</span>
            </div>
            <span className="text-sm text-white text-opacity-40">
              {item.description}
            </span>
            <div>DAY IMAGE HERE</div>
          </div>
        ))}
      </div>
    </section>
  );
}
