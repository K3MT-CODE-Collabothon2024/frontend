import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

// Rejestracja niezbędnych elementów w Chart.js
ChartJS.register(
  CategoryScale,   // Skala kategoryczna (dla osi X)
  LinearScale,     // Skala liniowa (dla osi Y)
  BarElement,      // Element słupkowy
  Title,           // Tytuł wykresu
  Tooltip,         // Narzędzie podpowiedzi
  Legend           // Legenda
);

// Przykładowe dane wykresu z grupami słupków
const chartData = {
  labels: ['Accounts', 'Deposits', 'Loans'],  // Kategorii (oś X)
  datasets: [
    {
      label: 'Current',
      data: [5000, 0, 0],  // Wartości dla "Current Account"
      backgroundColor: 'rgba(0, 148, 157, 0.7)',  // Kolor dla "Current Account"
      barPercentage: 0.8,  // Zwiększona szerokość słupków
      categoryPercentage: 1,  // Pełne wykorzystanie dostępnej szerokości dla grupy
    },
    {
      label: 'Savings',
      data: [15000, 0, 0],  // Wartości dla "Savings Account"
      backgroundColor: 'rgba(255, 99, 132, 0.7)',  // Kolor dla "Savings Account"
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
    {
      label: '3-month Deposit',
      data: [0, 10000, 0],  // Wartości dla "3-month Deposit"
      backgroundColor: 'rgba(54, 162, 235, 0.7)',  // Kolor dla "3-month Deposit"
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
    {
      label: '6-month Deposit',
      data: [0, 15000, 0],  // Wartości dla "6-month Deposit"
      backgroundColor: 'rgba(75, 192, 192, 0.7)',  // Kolor dla "6-month Deposit"
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
    {
      label: 'Mortgage Loan',
      data: [0, 0, 2000],  // Wartości dla "Mortgage Loan"
      backgroundColor: 'rgba(153, 102, 255, 0.7)',  // Kolor dla "Mortgage Loan"
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
    {
      label: 'Personal Loan',
      data: [0, 0, 10000],  // Wartości dla "Personal Loan"
      backgroundColor: 'rgba(255, 159, 64, 0.7)',  // Kolor dla "Personal Loan"
      barPercentage: 0.8,
      categoryPercentage: 1,
    },
  ],
};

// Opcje wykresu z grupowaniem słupków
const options: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: true,  // Wykres nie utrzyma proporcji, dostosuje się do kontenera
  aspectRatio: 1.5,              // Określa stosunek szerokości do wysokości (opcjonalne)
  plugins: {
    legend: {
      position: 'right',  // Zmieniono pozycję legendy na prawą stronę
      labels: {
        usePointStyle: true, // Używa okrągłych symboli w legendzie
        boxWidth: 20,        // Ustala rozmiar symboli w legendzie
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${context.dataset.label}: ${context.raw} EUR`;  // Formatowanie tooltipa
        },
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,  // Rozpoczynanie osi X od zera
      stacked: false,    // Wyłączenie zgrupowania słupków w pionie
      grid: {
        display: false,  // Ukrywanie siatki na osi X
      },
    },
    y: {
      beginAtZero: true,  // Rozpoczynanie osi Y od zera
      stacked: false,    // Włączenie osobnych słupków dla każdej kategorii
    },
  },
};

const AccountSummaryPopup = () => {
  const [isModalOpen, setModalOpen] = useState(false); // Stan do obsługi otwarcia modalu
  const [isDarkBackground, setDarkBackground] = useState(false); // Stan do zarządzania ciemnym tłem

  return (
      <div>
        {/* Wykres wyświetlający dane */}
        <div className="mb-6 w-[600px]">
          <Bar data={chartData} options={options} />
        </div>
      </div>
  );
};

export default AccountSummaryPopup;
