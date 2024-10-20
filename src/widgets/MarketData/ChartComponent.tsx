import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Oval } from 'react-loader-spinner';

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
    className?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ ticker, className }) => {
    const [data, setData] = useState<StockData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/stock/historical/${ticker}?period=5y&interval=1mo`)
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
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Oval color="#00BFFF" height={80} width={80} />
            </div>
        );
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
            height: '100%', // Adjusted height
            width: '100%'   // Adjusted width
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
        <div className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}>
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h1 className="text-center">{ticker} Stock Data</h1>
                <div className="w-full h-3/4 min-h-[440px]">
                    <ReactApexChart options={chartOptions} series={[{ data: chartData }]} type="candlestick" height="100%" />
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;