import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface DataItem {
  amount: string;
  name: string;
  type: string;
}

const data: DataItem[] = [
  { amount: "150000.00", name: "AAPL", type: "Stock" },
  { amount: "25000.00", name: "TSLA", type: "Stock" },
  { amount: "10000.00", name: "AMZN", type: "Stock" },
  { amount: "1000.00", name: "USD", type: "Valutes" },
  { amount: "850.00", name: "EUR", type: "Valutes" },
  { amount: "200000.00", name: "JPY", type: "Valutes" },
  { amount: "8000.05", name: "BTC", type: "Crypto" },
  { amount: "2000.00", name: "ETH", type: "Crypto" },
  { amount: "10000.00", name: "DOGE", type: "Crypto" },
  { amount: "50000.00", name: "Credit Card A", type: "Creditcards" },
  { amount: "20000.00", name: "Credit Card B", type: "Creditcards" },
  { amount: "30000.00", name: "Loan", type: "Credits" },
  { amount: "100000.00", name: "Savings Account", type: "Accounts" },
];

const previousData: DataItem[] = [
  { amount: "120000.00", name: "AAPL", type: "Stock" },
  { amount: "20000.00", name: "TSLA", type: "Stock" },
  { amount: "9000.00", name: "AMZN", type: "Stock" },
  { amount: "800.00", name: "USD", type: "Valutes" },
  { amount: "600.00", name: "EUR", type: "Valutes" },
  { amount: "180000.00", name: "JPY", type: "Valutes" },
  { amount: "7000.00", name: "BTC", type: "Crypto" },
  { amount: "1500.00", name: "ETH", type: "Crypto" },
  { amount: "8000.00", name: "DOGE", type: "Crypto" },
  { amount: "45000.00", name: "Credit Card A", type: "Creditcards" },
  { amount: "15000.00", name: "Credit Card B", type: "Creditcards" },
  { amount: "25000.00", name: "Loan", type: "Credits" },
  { amount: "95000.00", name: "Savings Account", type: "Accounts" },
];

const AccountAssets: React.FC = () => {
  const groupedData = data.reduce((acc: Record<string, number>, item: DataItem) => {
    const amount = parseFloat(item.amount);
    acc[item.type] = (acc[item.type] || 0) + amount;
    return acc;
  }, {});

  const previousGroupedData = previousData.reduce((acc: Record<string, number>, item: DataItem) => {
    const amount = parseFloat(item.amount);
    acc[item.type] = (acc[item.type] || 0) + amount;
    return acc;
  }, {});

  const currentTotal = Object.values(groupedData).reduce((acc, curr) => acc + curr, 0);
  const previousTotal = Object.values(previousGroupedData).reduce((acc, curr) => acc + curr, 0);

  const growthPercentage = previousTotal ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;

  const series = Object.values(groupedData);
  const labels = Object.keys(groupedData);

  // Zdefiniowane wyraziste odcienie koloru
  const colors = [
    '#1E90FF', // niebieski
    '#00BFFF', // jasny niebieski
    '#87CEEB', // błękitny
    '#4682B4', // stalowy niebieski
    '#4169E1', // królewski niebieski
    '#5F9EA0', // morski niebieski
    '#00CED1', // turkusowy
    '#20B2AA', // jasny morski
    '#40E0D0', // turkusowy
  ];

  const chartOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    colors: colors, // Dodanie kolorów do opcji
    labels: labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <Chart options={chartOptions} series={series} type="donut" width="400" />
        <div className="mt-2 text-md font-bold">{/* Miejsce na nazwę wykresu */}</div>
        <div className="mt-1 text-md font-bold">
          <span>Monthly growth:</span>
          <div className="font-mono">{growthPercentage.toFixed(2)}%</div> 
        </div>
      </div>
    </div>
  );
};

export default AccountAssets;
