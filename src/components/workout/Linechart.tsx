"use client";

import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { ChartData, CoreChartOptions } from "chart.js/auto";
import { _DeepPartialObject } from "node_modules/chart.js/dist/types/utils";

function chartData(
  previousData: number[],
  currentData: number[],
  xLabels: string[] | number[],
  prevLabel: string,
  currentLabel: string,
) {
  return {
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
  };
}

function chartOptions(previousData: number[], currentData: number[]) {
  return {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 40,
        bottom: 0,
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
      min: Math.min(...previousData, ...currentData) * 0.8,
      max: Math.max(...previousData, ...currentData) * 1.2,
    },
  };
}

export function LineChart({
  title,
  measureOf,
  xLabels,
  prevLabel,
  previousData,
  currentLabel,
  currentData,
}: {
  title: string;
  measureOf: string;
  xLabels: string[] | number[];
  prevLabel: string;
  previousData: number[];
  currentLabel: string;
  currentData: number[];
}) {
  const chartDataSetup = chartData(
    previousData,
    currentData,
    xLabels,
    prevLabel,
    currentLabel,
  ) as ChartData<"line", number[], string>;
  const chartAdditionalOptions = chartOptions(
    previousData,
    currentData,
  ) as _DeepPartialObject<CoreChartOptions<"line">>;

  return (
    <div className="relative flex">
      <div className="absolute left-0 right-0 top-2 text-center text-2xl">
        {title}
      </div>
      <div className="border-1 absolute right-2 top-2 rounded-sm border px-1.5 py-1 text-base">
        {measureOf}
      </div>
      <Line data={chartDataSetup} options={chartAdditionalOptions} />
    </div>
  );
}
