import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "tailwindcss/tailwind.css";
import { ApexOptions } from "apexcharts";

const IncomeExpensesChartSmaller: React.FC = () => {
  const [intervalIndex, setIntervalIndex] = useState<number>(0);

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

  // All interval data
  const intervalData = [monthlyData, quarterlyData, yearlyData];

  // Update data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalIndex((prevIndex) => (prevIndex + 1) % intervalData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Selecting data based on the interval index
  const currentData = intervalData[intervalIndex];

  // Updating series data and categories
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
      show: false, // Hide legend
    },
  };

  return (
    <div className="h-full p-4 overflow-hidden">
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-2xl font-bold mb-2 text-commerzBlue">Income and Expenses</h1>
      </div>
      <div className="relative w-full h-96">
        <Chart options={options} series={series} type="bar" height={400} />
      </div>
    </div>
  );
};

export default IncomeExpensesChartSmaller;
