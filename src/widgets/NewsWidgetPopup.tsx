import React from 'react';
import { News } from './News';

interface NewsWidgetPopupProps {
  news: News;
  closePopup: () => void;
}

const NewsWidgetPopup: React.FC<NewsWidgetPopupProps> = ({ news, closePopup }) => {
  return (
    <div className="fixed inset-0 bg-gray-300 bg-opacity-75 z-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 relative shadow-lg">
        <button onClick={closePopup} className="absolute top-2 right-2">
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">{news.title}</h2>
        <img src={news.image} alt={news.title} className="mb-4" />
        <p className="mb-4">{news.description}</p>
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsWidgetPopup;
