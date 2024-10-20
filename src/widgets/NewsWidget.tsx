import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NewsStorage from './NewsStorage';
import NewsWidgetPopup from './NewsWidgetPopup';
import { News } from './News';

const NewsWidget: React.FC = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const sampleNewsList: News[] = [
    {
      id: 1,
      title: 'Tech Innovations in 2024',
      image: 'https://example.com/images/tech.jpg',
      description: 'A detailed look at the most groundbreaking tech innovations expected in 2024.',
      link: 'https://example.com/news/tech-innovations-2024',
    },
    {
      id: 2,
      title: 'Climate Change and Its Global Impact',
      image: 'https://example.com/images/climate.jpg',
      description: 'How climate change is affecting the world, and what we can do to help.',
      link: 'https://example.com/news/climate-change',
    },
    {
      id: 3,
      title: 'New AI Tools Revolutionizing the Industry',
      image: 'https://example.com/images/ai.jpg',
      description: 'AI tools are changing the way businesses operate across various sectors.',
      link: 'https://example.com/news/ai-tools',
    },
    {
      id: 4,
      title: 'The Future of Electric Vehicles',
      image: 'https://example.com/images/ev.jpg',
      description: 'Electric vehicles are becoming more mainstream. What can we expect next?',
      link: 'https://example.com/news/electric-vehicles-future',
    },
  ];

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
    beforeChange: () => setSelectedNews(null),
  };

  const handleNewsClick = (news: News) => {
    setSelectedNews(news);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedNews(null);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Slider {...settings} className="w-full h-full flex items-center justify-center">
        {sampleNewsList.map((news) => (
          <div
            key={news.id}
            className="w-full h-full cursor-pointer"
            onClick={() => handleNewsClick(news)}
          >
            <NewsStorage news={news} />
          </div>
        ))}
      </Slider>

      {isPopupOpen && selectedNews && (
        <NewsWidgetPopup news={selectedNews} closePopup={closePopup} />
      )}
    </div>
  );
};

export default NewsWidget;
