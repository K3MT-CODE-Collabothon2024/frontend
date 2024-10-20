import React from "react";
import { News } from "./News";

interface NewsStorageProps {
  news: News;
}

const NewsWidgetPopupContent: React.FC<NewsStorageProps> = ({ news }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${news.image})` }}>
      <h2 className="text-2xl font-bold mb-4">Events</h2>
      <h1 className="text-commerzBlue text-2xl font-bold">{news.title}</h1>
      <h1 className="text-commerzBlue text-xl font-bold">{news.description}</h1>
      <h1 className="text-commerzBlue text-xl font-bold">{news.link}</h1>
    </div>
  );
};

export default NewsWidgetPopupContent;
