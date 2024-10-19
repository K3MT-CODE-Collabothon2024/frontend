import React, { useState } from "react";
import Chart from "react-apexcharts";
import "tailwindcss/tailwind.css";
import { ApexOptions } from "apexcharts";

const IncomeExpensesChart: React.FC = () => {
  const [interval, setInterval] = useState<string>("yearly");

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value);
  };

  // Dane dla poszczególnych interwałów
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

  // Wybór danych na podstawie wybranego interwału
  const currentData = interval === "monthly" ? monthlyData :
      interval === "quarterly" ? quarterlyData :
          yearlyData;

  // Aktualizacja serii danych i kategorii na podstawie interwału
  const series = [
    {
      name: "Expenses (EUR)",
      data: currentData.expenses,
    },
    {
      name: "Income (EUR)",
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
    colors: ["#85021f", "#04a425"], // Kolory dla wszystkich serii (np. pierwszy dla wydatków, drugi dla przychodów)
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
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Income and expenses</h1>
          <div>
            <select
                value={interval}
                onChange={handleIntervalChange}
                className="border border-gray-300 rounded p-2"
            >
              <option value="yearly">All year</option>
              <option value="quarterly">Quarterly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
        <div className="relative w-full h-96">
          <Chart options={options} series={series} type="bar" height={400} />
        </div>
      </div>
  );
};

export default IncomeExpensesChart;
