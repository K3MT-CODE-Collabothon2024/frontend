
import React from "react";
import { motion } from "framer-motion";

interface BaseWidgetProps {
  contentWidget: React.ReactNode;
}

const BaseWidget: React.FC<BaseWidgetProps> = ({ contentWidget }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      {/* Widget as a button */}
      <motion.div
        className={`relative w-full h-full cursor-pointer bg-commerzBrightGreen text-commerzBlue rounded-lg min-w-[300px] min-h-[250px] flex flex-col justify-start items-center`}
        whileHover={{ shadow: "shadow-lg" }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-center flex-grow w-full p-2 flex items-center justify-center">
          {contentWidget}
        </div>
      </motion.div>
    </div>
  );
};

export default BaseWidget;
