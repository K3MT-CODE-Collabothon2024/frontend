import React, { useState, useEffect } from 'react';
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
    { amount: "3000.00", name: "Loan", type: "Credits" },
    { amount: "10000.00", name: "Savings Account", type: "Accounts" },
];

const previousData: DataItem[] = [
    { amount: "140000.00", name: "AAPL", type: "Stock" },
    { amount: "20000.00", name: "TSLA", type: "Stock" },
    { amount: "9000.00", name: "AMZN", type: "Stock" },
    { amount: "900.00", name: "USD", type: "Valutes" },
    { amount: "800.00", name: "GBP", type: "Valutes" },
    { amount: "190000.00", name: "JPY", type: "Valutes" },
    { amount: "7500.00", name: "BTC", type: "Crypto" },
    { amount: "1500.00", name: "ETH", type: "Crypto" },
    { amount: "9000.00", name: "DOGE", type: "Crypto" },
    { amount: "40000.00", name: "Credit Card A", type: "Creditcards" },
    { amount: "18000.00", name: "Credit Card B", type: "Creditcards" },
    { amount: "28000.00", name: "Loan", type: "Credits" },
    { amount: "95000.00", name: "Savings Account", type: "Accounts" },
];

const AccountAssets: React.FC = () => {
    const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);
    const types = ['All', 'Stock', 'Valutes', 'Crypto', 'Creditcards', 'Credits', 'Accounts'];

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedTypeIndex(prevIndex => (prevIndex + 1) % types.length);
        }, 5000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    const groupDataByType = (dataToGroup: DataItem[]) => {
        return dataToGroup.reduce((acc: Record<string, number>, item: DataItem) => {
            const amount = parseFloat(item.amount);
            acc[item.type] = (acc[item.type] || 0) + amount;
            return acc;
        }, {});
    };

    const groupDataByName = (dataToGroup: DataItem[], selectedType: string) => {
        const filteredData = selectedType === 'All' ? dataToGroup : dataToGroup.filter(item => item.type === selectedType);
        return filteredData.reduce((acc: Record<string, number>, item: DataItem) => {
            const amount = parseFloat(item.amount);
            acc[item.name] = (acc[item.name] || 0) + amount;
            return acc;
        }, {});
    };

    const selectedType = types[selectedTypeIndex];
    const groupedData = selectedType === 'All' ? groupDataByType(data) : groupDataByName(data, selectedType);
    const previousGroupedData = groupDataByType(previousData);

    const currentTotal = Object.values(groupedData).reduce((acc, curr) => acc + curr, 0);
    const previousTotal = selectedType === 'All'
        ? Object.values(previousGroupedData).reduce((acc, curr) => acc + curr, 0)
        : previousData.filter(item => item.type === selectedType).reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

    const growthPercentage = previousTotal ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;

    const series = Object.values(groupedData);
    const labels = selectedType === 'All' ? Object.keys(groupedData) : Object.keys(groupedData);

    const colors = [
        '#002B2D',
        '#007B7A',
        '#40E0D0',
        '#d0cd75',
        '#FFC300',
        '#b7981d',
    ];

    const chartOptions: ApexOptions = {
        chart: {
            type: 'donut',
            width: 400, // Fixed width
            height: 400, // Fixed height
        },
        colors: colors,
        labels: labels,
        tooltip: {
            y: {
                formatter: (val) => `${val.toFixed(2)} EUR`,
            },
        },
        legend: {
          width: 100
        },
        responsive: [], // Disable responsive settings
    };

    const getBackgroundColor = (percentage: number) => {
        if (percentage > 0) return 'bg-green-300';
        if (percentage === 0) return 'bg-gray-300';
        return 'bg-red-200';
    };

    return (
        <div className="h-full p-4 overflow-hidden">
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold">{selectedType}</h2>
                <span
                    className={`mt-1 ml-4 text-sm font-bold rounded-xl p-2 ${getBackgroundColor(growthPercentage)}`}>
                    Monthly growth<div>{growthPercentage.toFixed(2)}%</div>
                </span>
            </div>

            <div style={{ width: '400px', height: '400px' }}>
                <Chart options={chartOptions} series={series} type="donut" />
            </div>
        </div>
    );
};

export default AccountAssets;
