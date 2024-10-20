import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

// Rejestracja niezbędnych elementów w Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Dane dla różnych okresów
const data3Months = {
  labels: ['Accounts', 'Deposits', 'Loans'],
  datasets: [
    { label: 'Current', data: [3000, 0, 0], backgroundColor: 'rgba(0, 148, 157, 0.7)' },
    { label: 'Savings', data: [10000, 0, 0], backgroundColor: 'rgba(255, 99, 132, 0.7)' },
    { label: '3-month Deposit', data: [0, 5000, 0], backgroundColor: 'rgba(54, 162, 235, 0.7)' },
    { label: 'Mortgage Loan', data: [0, 0, 1500], backgroundColor: 'rgba(153, 102, 255, 0.7)' },
  ],
};

const data6Months = {
  labels: ['Accounts', 'Deposits', 'Loans'],
  datasets: [
    { label: 'Current', data: [4000, 0, 0], backgroundColor: 'rgba(0, 148, 157, 0.7)' },
    { label: 'Savings', data: [12000, 0, 0], backgroundColor: 'rgba(255, 99, 132, 0.7)' },
    { label: '3-month Deposit', data: [0, 7000, 0], backgroundColor: 'rgba(54, 162, 235, 0.7)' },
    { label: '6-month Deposit', data: [0, 9000, 0], backgroundColor: 'rgba(75, 192, 192, 0.7)' },
    { label: 'Mortgage Loan', data: [0, 0, 2000], backgroundColor: 'rgba(153, 102, 255, 0.7)' },
  ],
};

const data1Year = {
  labels: ['Accounts', 'Deposits', 'Loans'],
  datasets: [
    { label: 'Current', data: [5000, 0, 0], backgroundColor: 'rgba(0, 148, 157, 0.7)' },
    { label: 'Savings', data: [15000, 0, 0], backgroundColor: 'rgba(255, 99, 132, 0.7)' },
    { label: '3-month Deposit', data: [0, 10000, 0], backgroundColor: 'rgba(54, 162, 235, 0.7)' },
    { label: '6-month Deposit', data: [0, 15000, 0], backgroundColor: 'rgba(75, 192, 192, 0.7)' },
    { label: 'Mortgage Loan', data: [0, 0, 2000], backgroundColor: 'rgba(153, 102, 255, 0.7)' },
    { label: 'Personal Loan', data: [0, 0, 10000], backgroundColor: 'rgba(255, 159, 64, 0.7)' },
  ],
};

// Opcje wykresu
const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.5,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        usePointStyle: true,
        boxWidth: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw} EUR`;
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      stacked: false,
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      stacked: false,
    },
  },
};

const AccountSummaryPopup = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Year'); // Domyślnie 1 rok
  const [chartData, setChartData] = useState(data1Year); // Dane wykresu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Kontrola stanu rozwijania listy

  // Aktualizacja danych na podstawie wybranego okresu
  useEffect(() => {
    if (selectedPeriod === '3Months') {
      setChartData(data3Months);
    } else if (selectedPeriod === '6Months') {
      setChartData(data6Months);
    } else {
      setChartData(data1Year);
    }
  }, [selectedPeriod]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4"> {/* Flex dla przycisku i wykresu */}
        {/* Wykres */}
        <div className="relative w-[600px]"> 
          <Bar data={chartData} options={options} />
        </div>

        {/* Przycisk rozwijania listy */}
        <div className="relative"> {/* Dodany div dla pozycji przycisku */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-[#a6dfca] border-gray-500 focus:outline-none p-2 rounded text-commerzBlue flex items-center min-w-[6rem]"
          >
            {selectedPeriod === '3Months' ? '3 months' : selectedPeriod === '6Months' ? '6 months' : '1 year'}
            {/* Strzałka */}
            <span className={`ml-2 transform transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {/* Rozwijana lista */}
          <div className={`transition-all duration-300 ease-in-out ${isDropdownOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden absolute right-0 bg-white shadow-lg rounded-lg mt-1 z-10`}>
            <ul className="text-gray-800">
              <li
                onClick={() => { setSelectedPeriod('3Months'); setIsDropdownOpen(false); }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                3 months
              </li>
              <li
                onClick={() => { setSelectedPeriod('6Months'); setIsDropdownOpen(false); }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                6 months
              </li>
              <li
                onClick={() => { setSelectedPeriod('1Year'); setIsDropdownOpen(false); }}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              >
                1 year
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummaryPopup;
