import React from 'react';
import { News } from './News';

interface NewsWidgetPopupProps {
  news: News;
  onClose: () => void;
}

const NewsWidgetPopup: React.FC<NewsWidgetPopupProps> = ({ news, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 z-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-3xl relative">
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-2 text-red-600"
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">{news.title}</h2>
        <p className="mb-4">{news.description}</p>
        <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsWidgetPopup;
