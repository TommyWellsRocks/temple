"use client";

import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, CoreChartOptions } from "chart.js/auto";
import { _DeepPartialObject } from "node_modules/chart.js/dist/types/utils";

function chartData(
  xLabels: string[] | number[],
  currentLabel: string,
  currentData: number[],
  prevLabel?: string,
  previousData?: number[],
) {
  return previousData
    ? {
        labels: xLabels,
        datasets: [
          {
            label: prevLabel,
            data: previousData,
            fill: true,
            borderColor: "#999",
            backgroundColor: "rgba(153, 153, 153, 0.5)",
            tension: 0.1,
            borderDash: [5, 5],
          },
          {
            label: currentLabel,
            data: currentData,
            fill: true,
            borderColor: "rgba(102, 56, 254, 1)",
            backgroundColor: "rgba(102, 56, 254)",
            tension: 0.1,
          },
        ],
      }
    : {
        labels: xLabels,
        datasets: [
          {
            label: currentLabel,
            data: currentData,
            fill: true,
            borderColor: "rgba(102, 56, 254, 1)",
            backgroundColor: "rgba(102, 56, 254)",
            tension: 0.1,
          },
        ],
      };
}

function chartOptions(currentData: number[], previousData?: number[]) {
  return {
    plugins: {
      legend: {
        display: false,
      },
    },
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
      min: previousData
        ? Math.min(...previousData, ...currentData) * 0.8
        : Math.min(...currentData) * 0.8,
      max: previousData
        ? Math.max(...previousData, ...currentData) * 2.1
        : Math.max(...currentData) * 2.1,
    },
  };
}

export function LineChart({
  measureOf,
  xLabels,
  prevLabel,
  previousData,
  currentLabel,
  currentData,
}: {
  measureOf: string;
  xLabels: string[] | number[];
  prevLabel?: string;
  previousData?: number[];
  currentLabel: string;
  currentData: number[];
}) {
  const chartDataSetup = chartData(
    xLabels,
    currentLabel,
    currentData,
    prevLabel,
    previousData,
  ) as ChartData<"line", number[], string>;
  const chartAdditionalOptions = chartOptions(
    currentData,
    previousData,
  ) as _DeepPartialObject<CoreChartOptions<"line">>;

  return (
    <div className="relative flex rounded-lg bg-black bg-opacity-30">
      <span className="border-1 absolute right-1 top-1.5 rounded-sm border px-1.5 text-sm font-light min-[380px]:right-2 min-[380px]:top-2.5 min-[380px]:py-0.5 min-[380px]:text-base">
        {measureOf}
      </span>
      <Line data={chartDataSetup} options={chartAdditionalOptions} />
    </div>
  );
}
