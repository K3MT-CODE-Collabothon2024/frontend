import React, { useState } from 'react';
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

const AccountAssets: React.FC = () => {
    const [selectedTypeIndex] = useState<number>(0);
    const types = ['All', 'Stock', 'Valutes', 'Crypto', 'Creditcards', 'Credits', 'Accounts'];

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
            width: 400,
            height: 400,
        },
        colors: colors,
        labels: labels,
        tooltip: {
            y: {
                formatter: (val) => `${val.toFixed(2)} EUR`,
            },
        },
        legend: {
            width: 100,
            labels: {
                style: {
                    fontWeight: 'bold', // Make legend names bold
                },
            } as any, // Type assertion
        } as any, // Type assertion
        responsive: [],
    };

    return (
        <div className="flex relative items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                    <h2 className="text-xl font-bold">Products Balance</h2>
                </div>

                <div style={{ width: '400px', height: '400px' }}>
                    <Chart options={chartOptions} series={series} type="donut" width-max={300} height-max={300} />
                </div>
            </div>
        </div>
    );
};

export default AccountAssets;
