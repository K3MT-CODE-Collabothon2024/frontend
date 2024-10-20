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
        className="w-full h-full cursor-pointer bg-commerzBrightGreen text-commerzBlue rounded-lg flex flex-col justify-start items-center"
        
      >
        <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
          {/* Ensures contentWidget fills the space */}
          <div className="w-full h-full flex items-center justify-center overflow-clip">
            {contentWidget}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BaseWidget;

