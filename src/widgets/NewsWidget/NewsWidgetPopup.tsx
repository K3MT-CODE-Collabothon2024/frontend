import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { News } from './News';
import NewsWidgetPopupContent from './NewsWidgetPopupContent';

const sampleNewsList: News[] = [
  {
    id: 1,
    title: 'Collabothon 2024',
    image: 'Collabothon.png',
    description: 'The big day has come! Commerzbank\'s own hackathon - Collabothon 2024 has just taken off!',
    link: 'https://www.linkedin.com/posts/commerzbank-branch-in-poland_code4bank-collabothon-commerzbank-activity-7253056803029086208-wg9w?utm_source=share&utm_medium=member_desktop'
},
{
    id: 2,
    title: '#CommerzTechGeeks - our new podcast',
    image: 'podcast.png',
    description: 'What is it like to work at our company? What myths surround Commerzbank? In what direction are we developing compared to the IT industry in Poland?',
    link: 'https://lodz.commerzbank.pl/news/commerztechgeeks'
},
{
    id: 3,
    title: 'Launching new banking app',
    image: 'logo_commerzbank.png',
    description: 'Introducing our new banking app, designed for seamless, secure, and intuitive banking at your fingertips. Manage your finances, track transactions, and access personalized insights all in one place, anytime, anywhere.',
    link: 'https://www.commerzbank.de/konten-zahlungsverkehr/service/digital-banking/'
},
{
    id: 4,
    title: 'Women in Tech Conference 2024',
    image: 'women_in_tech.png',
    description: 'Join us at the Women in Tech Conference 2024, where we celebrate diversity and innovation in the tech industry. Hear inspiring stories from leading female professionals in the field.',
    link: 'https://www.commerzbank.com/womenintech2024'
},
];

const NewsWidget: React.FC = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    swipe: false,
    draggable: true,
    arrows: true,
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <Slider {...settings} className="w-full h-full flex items-center justify-center">
        {sampleNewsList.map((news) => (
          <div key={news.id} className="w-full h-full cursor-pointer">
            <NewsWidgetPopupContent news={news} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewsWidget;
