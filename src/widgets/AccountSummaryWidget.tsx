import { useEffect } from 'react';
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

// Przykładowe dane wykresu
const chartData = {
  labels: ['Account 1', 'Account 2', 'Account 3'],  // Etykiety dla osi X
  datasets: [
    {
      label: 'Balance',
      data: [5000, 15000, 10000],  // Wartości do wyświetlenia
      backgroundColor: 'rgba(0, 148, 157, 0.5)',  // Kolor słupków
    },
  ],
};

// Opcje wykresu z poprawnym typowaniem
const options: ChartOptions<'bar'> = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',  // Pozycja legendy
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
    },
    y: {
      beginAtZero: true,  // Rozpoczynanie osi Y od zera
    },
  },
};

const AccountSummaryWidget = () => {
  useEffect(() => {
    // Możesz dodać inne logiki związane z wykresem tutaj, np. ładowanie danych
    return () => {
      // Może być konieczne czyszczenie po wykresie
    };
  }, []);

  return (
    <div className="p-8 bg-commerzBrightGreen text-commerzBlue max-w-md mx-auto rounded-lg shadow-lg cursor-pointer">
      <h2 className="text-2xl font-bold mb-4">Account Summary</h2>

      {/* Wykres wyświetlający dane */}
      <div className="mb-6">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AccountSummaryWidget;
