import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NewsStorage from './NewsStorage';
import { News } from './News';

const sampleNewsList: News[] = [
  {
    id: 1,
    title: "Tech Innovations in 2024",
    image: "https://example.com/images/tech.jpg",
    description: "A detailed look at the most groundbreaking tech innovations expected in 2024.",
    link: "https://example.com/news/tech-innovations-2024",
  },
  {
    id: 2,
    title: "Climate Change and Its Global Impact",
    image: "https://example.com/images/climate.jpg",
    description: "How climate change is affecting the world, and what we can do to help.",
    link: "https://example.com/news/climate-change",
  },
  // Other news items...
];

const NewsWidget: React.FC = () => {

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
    arrows: false,
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Slider {...settings} className="w-full h-full flex items-center justify-center">
        {sampleNewsList.map((news) => (
          <div key={news.id} className="w-full h-full cursor-pointer">
            <NewsStorage news={news} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsWidget;
