import React, { useState } from "react";
import Chart from "react-apexcharts";
import "tailwindcss/tailwind.css";
import { ApexOptions } from "apexcharts";

const IncomeExpensesChart: React.FC = () => {
  const [interval, setInterval] = useState<string>("yearly");

  const handleIntervalChange = (selectedInterval: string) => {
    setInterval(selectedInterval);
  };

  // Data for each interval
  const monthlyData = {
    expenses: [400, 300, 500, 200, 400, 700, 100, 300, 400, 500, 600, 300],
    income: [600, 500, 800, 400, 700, 900, 200, 500, 700, 800, 900, 600],
    categories: [
      "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ],
  };

  const quarterlyData = {
    expenses: [1200, 1300, 1500, 1400], // sum of every 3 months
    income: [1900, 2000, 2200, 2300],
    categories: ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"],
  };

  const yearlyData = {
    expenses: [5000], // total expenses
    income: [8400], // total income
    categories: ["2023"], // year
  };

  // Selecting data based on the chosen interval
  const currentData = interval === "monthly" ? monthlyData :
      interval === "quarterly" ? quarterlyData :
          yearlyData;

  // Updating series data and categories based on the interval
  const series = [
    {
      name: "Expenses",
      data: currentData.expenses,
    },
    {
      name: "Income",
      data: currentData.income,
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    colors: ["#85021f", "#04a425"], // Colors for all series (first for expenses, second for income)
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: currentData.categories,
    },
    yaxis: {
      title: {
        text: "EUR",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} EUR`,
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
  };

  return (
      <div className="h-full p-4 overflow-hidden">
        <div className="flex flex-col items-center mb-4">
          <h1 className="text-2xl font-bold mb-2 text-commerzBlue">Income and Expenses</h1>
          <div className="flex space-x-4 ">
            <button
                onClick={() => handleIntervalChange("monthly")}
                className={`py-2 px-4 rounded ${interval === "monthly" ? "bg-commerzBlue text-commerzYellow" : "bg-gray-200 text-black"}`}
            >
              Monthly
            </button>
            <button
                onClick={() => handleIntervalChange("quarterly")}
                className={`py-2 px-4 rounded ${interval === "quarterly" ? "bg-commerzBlue text-commerzYellow" : "bg-gray-200 text-black"}`}
            >
              Quarterly
            </button>
            <button
                onClick={() => handleIntervalChange("yearly")}
                className={`py-2 px-4 rounded ${interval === "yearly" ? "bg-commerzBlue text-commerzYellow" : "bg-gray-200 text-black"}`}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="relative w-full h-96">
          <Chart options={options} series={series} type="bar" height={400} />
        </div>
      </div>
  );
};

export default IncomeExpensesChart;
