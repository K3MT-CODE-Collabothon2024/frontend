import React from "react";
import { News } from "./News";
import closeIcon from "../icons/close_icon.png"; // Ikona zamknięcia

interface NewsWidgetPopupProps {
  news: News;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentNewsIndex: number;
  newsListLength: number;
}

const NewsWidgetPopup: React.FC<NewsWidgetPopupProps> = ({
  news,
  onPrevious,
  onNext,
  currentNewsIndex,
  newsListLength,
}) => {
  const isFirst = currentNewsIndex === 0;
  const isLast = currentNewsIndex === newsListLength - 1;
    
  if (!news) {
    return <div>News not available</div>;
  }

  return (

    <>

      {/* Zawartość newsa */}
      <div className="flex flex-col justify-center items-center">
        {news.image && (
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-auto mb-4 object-cover rounded-lg"
          />
        )}
        <h2 className="text-2xl font-bold mb-4">{news.title}</h2>
        <p className="text-lg mb-4">{news.description}</p>
        <a
          href={news.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-commerzBlue text-white py-2 px-4 rounded-lg"
        >
          Read more
        </a>
      </div>

      {/* Przyciski nawigacji */}
      <div className="flex justify-between mt-4">
        <button
          onClick={onPrevious}
          className="bg-commerzBlue text-white py-2 px-4 rounded-lg"
          disabled={isFirst}
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="bg-commerzBlue text-white py-2 px-4 rounded-lg"
          disabled={isLast}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default NewsWidgetPopup;
