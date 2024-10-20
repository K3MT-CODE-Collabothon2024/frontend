import React from "react";
import { News } from "./News";

interface NewsStorageProps {
  news: News;
}

const NewsStorage: React.FC<NewsStorageProps> = ({ news }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${news.image})` }}>
      <h1 className="text-white text-xl font-bold">{news.title}</h1>
    </div>
  );
};

export default NewsStorage;
