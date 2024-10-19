import React from 'react';
import Slider from 'react-slick';
import ChartComponent from './ChartComponent';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MarketDataWidget.css'; // Import custom CSS

const MarketDataWidget: React.FC = () => {
    const tickers = ['META', 'AAPL', 'GOOGL', 'AMZN']; // Add more tickers as needed

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="market-data-widget">
            <h1>Market Data</h1>
            <Slider {...settings}>
                {tickers.map(ticker => (
                    <div key={ticker}>
                        <ChartComponent ticker={ticker} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MarketDataWidget;