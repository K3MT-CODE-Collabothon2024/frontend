import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BaseWidgetProps {
  isWide: boolean;  // Determines whether the widget should be wide
  title: string;    // Title of the widget
  content_before_pop_up: React.ReactNode;  // Content before the pop-up
  content_after_pop_up: React.ReactNode;   // Content inside the pop-up
}

const BaseWidget: React.FC<BaseWidgetProps> = ({ isWide, title, content_before_pop_up, content_after_pop_up }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Function to handle widget click to toggle pop-up visibility
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div>
      {/* Widget container (clickable) */}
      <motion.div
        className={`relative cursor-pointer bg-commerzBrightGreen text-commerzBlue rounded-lg shadow-lg ${
          isWide ? 'w-1/2' : 'w-1/4'
        } h-[50vh] flex flex-col justify-center items-center`}
        onClick={togglePopup}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Widget Header */}
        <div className="flex justify-center items-center w-full">
          <h1 className="text-4xl text-white">{title}</h1>
        </div>

        {/* Content before pop-up */}
        <div className="text-center mt-4">
          {content_before_pop_up}
        </div>
      </motion.div>

      {/* Pop-up */}
      {isPopupVisible && (
        <>
          {/* Full-screen background overlay */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"></div>

          {/* Pop-up with animation */}
          <motion.div
            className="fixed inset-0 flex justify-center items-center z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg w-full max-w-3xl overflow-y-auto relative"
              initial={{ y: '100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              {/* Content inside the pop-up */}
              {content_after_pop_up}

              {/* Close button */}
              <button
                onClick={togglePopup}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600"
              >
                X
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default BaseWidget;
