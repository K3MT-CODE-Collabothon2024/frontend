import React from "react";
import { motion } from "framer-motion";

interface BaseWidgetProps {
  contentWidget: React.ReactNode;
}

const BaseWidget: React.FC<BaseWidgetProps> = ({ contentWidget }) => {
  return (
    <div className="flex justify-center items-center w-full h-full border-4 border-commerzBlue rounded-lg">
      {/* Widget as a button */}
      <motion.div
        className={`w-full h-full cursor-pointer bg-commerzBrightGreen text-commerzBlue rounded-lg  flex flex-col justify-start items-center`}
        whileHover={{ shadow: "shadow-lg" }}
        //whileTap={{ scale: 0.95 }}
      >
        <div className="text-center flex-grow w-full p-2 flex items-center justify-center">
          {contentWidget}
        </div>
      </motion.div>
    </div>
  );
};

export default BaseWidget;
