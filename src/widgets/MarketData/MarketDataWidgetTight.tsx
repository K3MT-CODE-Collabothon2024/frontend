import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Oval } from 'react-loader-spinner'; 
import { FaChartLine } from 'react-icons/fa'; 

interface CurrentStockData {
    close: number;
    date: string;
    high: number;
    low: number;
    open: number;
    ticker: string;
    volume: number;
}

interface Asset {
    name: string;
    amount: number;
    type: string;
}

const MarketDataWidgetTight: React.FC = () => {
    const [tickers, setTickers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tickers:', error);
                setLoading(false);
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
        arrows: false 
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <Oval color="#00BFFF" height={80} width={80} />
                </div>
            ) : (
                <Slider {...settings} className="w-full h-full flex items-center justify-center">
                    {tickers.map(ticker => (
                        <TickerSlide key={ticker} ticker={ticker} />
                    ))}
                </Slider>
            )}
        </div>
    );
};

interface TickerSlideProps {
    ticker: string;
}

const TickerSlide: React.FC<TickerSlideProps> = ({ ticker }) => {
    const [currentData, setCurrentData] = useState<CurrentStockData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/stock/current/${ticker}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setCurrentData(data[0]);
                } else {
                    setCurrentData(null);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching current data:', error);
                setLoading(false);
            });
    }, [ticker]);

    const generateRandomData = () => {
        const randomGrowth = (Math.random() * 3 - 1).toFixed(2); 
        return { randomGrowth };
    };

    const { randomGrowth } = generateRandomData();
    const growthColor = parseFloat(randomGrowth) >= 0 ? 'text-green-500' : 'text-red-500';

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-opacity-80 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-4">{ticker}</h2>
            {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <Oval color="#00BFFF" height={80} width={80} />
                </div>
            ) : (
                currentData && (
                    <div className="w-full flex flex-col items-center">
                        <FaChartLine className="text-4xl mb-4" />
                        <div className="text-2xl font-bold mb-2">{currentData.close.toFixed(2)}</div>
                        <div className={`text-xl font-semibold ${growthColor}`}>
                            {randomGrowth}%
                        </div>
                        <div className="text-md mt-4">
                            <span className="font-semibold">High:</span> {currentData.high.toFixed(2)}
                        </div>
                        <div className="text-md">
                            <span className="font-semibold">Low:</span> {currentData.low.toFixed(2)}
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default MarketDataWidgetTight;