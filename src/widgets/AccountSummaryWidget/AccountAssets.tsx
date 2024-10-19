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
  { amount: "140000.00", name: "AAPL", type: "Stock" }, // 150000.00 - 140000.00 = 10000.00
  { amount: "20000.00", name: "TSLA", type: "Stock" }, // 25000.00 - 20000.00 = 5000.00
  { amount: "9000.00", name: "AMZN", type: "Stock" },  // 10000.00 - 9000.00 = 1000.00
  { amount: "900.00", name: "USD", type: "Valutes" },  // 1000.00 - 900.00 = 100.00
  { amount: "800.00", name: "EUR", type: "Valutes" },  // 850.00 - 800.00 = 50.00
  { amount: "190000.00", name: "JPY", type: "Valutes" }, // 200000.00 - 190000.00 = 10000.00
  { amount: "7500.00", name: "BTC", type: "Crypto" },  // 8000.05 - 7500.00 = 500.05
  { amount: "1500.00", name: "ETH", type: "Crypto" },   // 2000.00 - 1500.00 = 500.00
  { amount: "9000.00", name: "DOGE", type: "Crypto" },  // 10000.00 - 9000.00 = 1000.00
  { amount: "40000.00", name: "Credit Card A", type: "Creditcards" }, // 50000.00 - 40000.00 = 10000.00
  { amount: "18000.00", name: "Credit Card B", type: "Creditcards" }, // 20000.00 - 18000.00 = 2000.00
  { amount: "28000.00", name: "Loan", type: "Credits" }, // 30000.00 - 28000.00 = 2000.00
  { amount: "95000.00", name: "Savings Account", type: "Accounts" }, // 100000.00 - 95000.00 = 5000.00
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
    '#002B2D', // ciemny turkus
    '#007B7A', // stalowy turkus
    '#40E0D0', // turkusowy
    '#d0cd75', // jasny żółty
    '#FFC300', // miodowy
    '#b7981d', // złoty
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
    tooltip: {
      y: {
        formatter: (val) => `${val.toFixed(2)} PLN`, // formatowanie wartości tooltipa
      },
    },
  };

  // Określenie koloru tła w zależności od wartości wzrostu
  const getBackgroundColor = (percentage: number) => {
    if (percentage > 0) return 'bg-green-300'; // Jasnozielony
    if (percentage === 0) return 'bg-gray-300'; // Szary
    return 'bg-red-200'; // Jasnoczerwony
  };

  return (
      <div className="flex">
        <div className="flex flex-col ">
          <div className="flex items-center mb-4"> {/* Kontener dla tytułu i wzrostu */}
            <h2 className="text-xl font-bold">Products Balance</h2>
            <span
                className={`mt-1 ml-4 text-md font-bold border-4 border-black rounded-xl p-2 ${getBackgroundColor(growthPercentage)}`}>
        Monthly growth: <div>{growthPercentage.toFixed(2)}%</div>
      </span>
          </div>
          <div className="font-mono"></div>
          <Chart options={chartOptions} series={series} type="donut" width="400"/>
          <div className="mt-2 text-md font-bold">{/* Miejsce na nazwę wykresu */}</div>
        </div>
      </div>

  );
};

export default AccountAssets;