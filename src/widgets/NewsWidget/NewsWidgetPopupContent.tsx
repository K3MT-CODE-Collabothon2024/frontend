import React from "react";
import { News } from "./News";

interface NewsStorageProps {
  news: News;
}

const NewsWidgetPopupContent: React.FC<NewsStorageProps> = ({ news }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-cover bg-center">
      {/* Obraz */}
      <img
        src={news.image}
        alt={news.title}
        className="w-full h-64 object-cover mb-4"
      />

      {/* Tytuł i opis */}
      {/* <h2 className="text-2xl font-bold mb-4">Events</h2> */}
      <h1 className="text-commerzBlue text-2xl font-bold">{news.title}</h1>
      <h1 className="text-commerzBlue text-xl font-bold">{news.description}</h1>

      {/* Przycisk do linku */}
      <a
        href={news.link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 bg-commerzBlue text-white px-4 py-2 rounded hover:bg-commerzBlueDark transition duration-200"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsWidgetPopupContent;
