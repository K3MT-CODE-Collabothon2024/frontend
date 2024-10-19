import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface BaseWidgetProps {
  isWide: boolean;
  contentWidget: React.ReactNode;
  contentPopup: React.ReactNode;
}

const BaseWidget: React.FC<BaseWidgetProps> = ({ isWide, contentWidget, contentPopup }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="flex justify-center items-center my-4">
      {/* Widget jako przycisk */}
      <motion.div
        className={`relative cursor-pointer bg-commerzBrightGreen text-commerzBlue rounded-lg min-w-70
        } min-w-[300px] min-h-[250px] flex flex-col justify-center items-center`}  
        onClick={togglePopup}
        whileHover={{ shadow: "shadow-lg" }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="text-center mt-4 flex-grow w-full p-2  flex items-center justify-center">
          {contentWidget}
        </div>
      </motion.div>

      {/* Pop-up */}
      {isPopupVisible && (
        <>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"></div>

          <motion.div
            className="fixed inset-0 flex justify-center items-center z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-commerzBrightGreen p-8 rounded-lg w-auto max-w-[90vw] max-h-[90vh] overflow-y-auto relative" 
              initial={{ y: '100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              <button
  onClick={closePopup}
  className="absolute top-2 right-2 w-8 h-8 text-white bg-red-500 p-2 rounded-full focus:outline-none flex items-center justify-center"
>
  ×
</button>


              <div className="flex flex-col justify-center items-center w-full">
                {contentPopup}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default BaseWidget;
