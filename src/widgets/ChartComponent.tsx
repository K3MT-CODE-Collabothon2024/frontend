import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface StockData {
    close: number;
    date: string;
    high: number;
    low: number;
    open: number;
    ticker: string;
    volume: number;
}

interface ChartComponentProps {
    ticker: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ ticker }) => {
    const [data, setData] = useState<StockData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/stock/${ticker}?period=5y&interval=1mo`)
            .then(response => response.json())
            .then((data: StockData[]) => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [ticker]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (data.length === 0) {
        return <div>Error fetching data</div>;
    }

    const chartData = data.map((item: StockData) => ({
        x: new Date(item.date),
        y: [item.open, item.high, item.low, item.close]
    }));

    const chartOptions: ApexCharts.ApexOptions = {
        chart: {
            type: 'candlestick',
            height: 250 // Adjusted height
        },
        title: {
            text: `${ticker} Stock Data`,
            align: 'left'
        },
        xaxis: {
            type: 'datetime'
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        }
    };

    return (
        <div>
            <h1>{ticker} Stock Data</h1>
            <ReactApexChart options={chartOptions} series={[{ data: chartData }]} type="candlestick" height={250} />
        </div>
    );
};

export default ChartComponent;