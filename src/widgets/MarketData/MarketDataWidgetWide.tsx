import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ChartComponent from './ChartComponent';


const MarketDataWidget: React.FC = () => {
    const tickers = ['META', 'AAPL', 'GOOGL', 'AMZN']; 
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000, 
        swipe: false,
        draggable: false,
        arrows: false
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
            <Slider {...settings} className="w-full h-full flex items-center justify-center">
                {tickers.map(ticker => (
                    <div key={ticker} className="flex items-center justify-center w-11/12 h-full">
                        <h2 className="text-2xl font-bold mb-4">Market Data</h2>
                        <ChartComponent ticker={ticker} className="w-3/4 h-3/4"/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MarketDataWidget;