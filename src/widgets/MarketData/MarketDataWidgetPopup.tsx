import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChartComponent from './ChartComponent';
import { Oval } from 'react-loader-spinner';

interface MarketDataWidgetPopupProps {
    tickers: string[];
}

interface Asset {
    name: string;
    amount: number;
    type: string;
}

const MarketDataWidgetPopup: React.FC<MarketDataWidgetPopupProps> = () => {
    const [tickers, setTickers] = useState<string[]>([]);

    useEffect(() => {
        if (tickers.length > 0) {
            return;
        }

        fetch(`http://127.0.0.1:5000/api/customer/1/assets`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const stockTickers = data
                        .filter((asset: Asset) => asset.type === 'stock')
                        .map((asset: Asset) => asset.name);
                    setTickers(stockTickers);
                } else {
                    setTickers([]);
                }
            })
            .catch(error => {
                console.error('Error fetching tickers:', error);
            });
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        swipe: true,
        draggable: true,
        arrows: true 
    };

    if (!tickers || tickers.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Oval color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Slider {...settings} className="w-full h-full flex items-center justify-center">
                {tickers.map(ticker => (
                    <TickerSlide key={ticker} ticker={ticker} />
                ))}
            </Slider>
        </div>
    );
};

interface TickerSlideProps {
    ticker: string;
}

interface CurrentStockData {
    close: number;
    date: string;
    high: number;
    low: number;
    open: number;
    ticker: string;
    volume: number;
}

const TickerSlide: React.FC<TickerSlideProps> = ({ ticker }) => {
    const [currentData, setCurrentData] = useState<CurrentStockData[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/stock/historical/${ticker}?period=5y&interval=1mo`)
            .then(response => response.json())
            .then((data: CurrentStockData[]) => {
                setCurrentData(data);
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

    if (currentData.length === 0) {
        return <div>Error fetching data</div>;
    }

    const tableData = currentData.slice(0, 9).map((item: CurrentStockData) => ({
        date: item.date,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volume: item.volume
    }));

    return (
        <div className="flex flex-col items-center justify-center w-11/12 h-full">
            <h2 className="text-2xl font-bold mb-4">Market Data for {ticker}</h2>
            <ChartComponent ticker={ticker} className="w-3/4 h-2/3 mb-6" />
            {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <Oval color="#00BFFF" height={80} width={80} />
                </div>
            ) : (
                <table className="w-full mt-4 border-collapse border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 rounded-tl-lg">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Close</th>
                            <th className="border border-gray-300 px-4 py-2">High</th>
                            <th className="border border-gray-300 px-4 py-2">Low</th>
                            <th className="border border-gray-300 px-4 py-2">Open</th>
                            <th className="border border-gray-300 px-4 py-2 rounded-tr-lg">Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((data, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{data.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{data.close.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{data.high.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{data.low.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{data.open.toFixed(2)}</td>
                                <td className="border border-gray-300 px-4 py-2">{data.volume}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MarketDataWidgetPopup;