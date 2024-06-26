import { getVolumeData } from "~/server/queries/workoutSessions";
import LineChart from "./_components/linechart";


// export const metadata = {
//   title: "Workout Overview",
//   description: "Built to spec.",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };

export default async function WorkoutOverview() {
  const [lastWeek, thisWeek] = await getVolumeData(1)
  return (
    <div className="flex flex-col">
      <LineChart page="Overview" previousData={lastWeek} currentData={thisWeek}/>
    </div>
  );
}

{
  /* <LineChart page={"Overview"} /> */
}
