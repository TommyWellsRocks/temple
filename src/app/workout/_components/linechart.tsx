"use client";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, CoreChartOptions } from "chart.js/auto";
import { _DeepPartialObject } from "node_modules/chart.js/dist/types/utils";

function chartData(
  previousData: number[],
  currentData: number[],
  page: "Overview" | "Individual",
) {
  if (page === "Overview")
    return {
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          label: "Last Weeks's Volume",
          data: previousData,
          fill: true,
          borderColor: "#999",
          backgroundColor: "rgba(153, 153, 153, 0.5)",
          tension: 0.1,
          borderDash: [5, 5],
        },
        {
          label: "This Week's Volume",
          data: currentData,
          fill: true,
          borderColor: "rgba(102, 56, 254, 1)",
          backgroundColor: "rgba(102, 56, 254)",
          tension: 0.1,
        },
      ],
    };
  else if (page === "Individual") {
    return {
      labels:
        previousData.length < currentData.length
          ? currentData.map((_, index) => `Set ${index + 1}`)
          : previousData.map((_, index) => `Set ${index + 1}`),
      datasets: [
        {
          label: "Last Session's Volume",
          data: previousData,
          fill: true,
          borderColor: "#999",
          backgroundColor: "rgba(153, 153, 153, 0.5)",
          tension: 0.1,
          borderDash: [5, 5],
        },
        {
          label: "Current Session's Volume",
          data: currentData,
          fill: true,
          borderColor: "rgba(102, 56, 254, 1)",
          backgroundColor: "rgba(102, 56, 254)",
          tension: 0.1,
        },
      ],
    };
  }
}

function chartOptions(previousData: number[], currentData: number[]) {
  return {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        align: "inner",
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        callback: function (value: number) {
          return `${value}lbs`;
        },
        autoSkipPadding: 20,
      },
      min: Math.min(...previousData, ...currentData) * 0.8,
      max: Math.max(...previousData, ...currentData) * 1.2,
    },
  };
}

export default function LineChart({
  page,
  previousData,
  currentData,
}: {
  page: "Overview" | "Individual";
  previousData: number[];
  currentData: number[];
}) {
  const chartDataSetup = chartData(
    previousData,
    currentData,
    page,
  ) as ChartData<"line", number[], string>;
  const chartAdditionalOptions = chartOptions(
    previousData,
    currentData,
  ) as _DeepPartialObject<CoreChartOptions<"line">>;

  return (
    <div>
      <Line data={chartDataSetup} options={chartAdditionalOptions} />
    </div>
  );
}
