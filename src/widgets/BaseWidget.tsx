import React, { useState } from 'react';
import { motion } from 'framer-motion';
import closeIcon from '../icons/close_icon.png';

interface BaseWidgetProps {
  contentWidget: React.ReactNode;
  contentPopup: React.ReactNode;
}

const BaseWidget: React.FC<BaseWidgetProps> = ({ contentWidget, contentPopup }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleWidgetClick = (e: React.MouseEvent) => {
    // Zapobiegaj wyświetleniu popupu, gdy klikniesz w checkbox lub przycisk 'x'
    if ((e.target as HTMLElement).closest('input, button')) {
      return; // Zatrzymaj propagację kliknięcia
    }
    togglePopup();
  };

  return (
    <div className="flex justify-center items-center my-4">
      {/* Widget as button */}
      <motion.div

        className="relative cursor-pointer bg-commerzBrightGreen text-commerzBlue rounded-lg min-w-[300px] min-h-[250px] flex flex-col justify-start items-center p-2"
        onClick={handleWidgetClick}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-full flex flex-col items-center">
          {contentWidget}
        </div>
      </motion.div>

      {/* Pop-up */}
      {isPopupVisible && (
        <>
          <div className="fixed inset-0 bg-gray-300 bg-opacity-75 z-40"></div>

          <motion.div
            className="fixed inset-0 flex justify-center items-center z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div

              className="bg-commerzBrightGreen p-8 rounded-lg w-auto max-w-[90vw] max-h-[90vh] overflow-y-auto relative border-2 border-solid border-commerzBlue" 

              initial={{ y: '100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              <button
                onClick={closePopup}
                className="absolute top-0 right-0 w-30 h-30 text-commerzBlue p-2 flex items-center justify-center"
              >
                <img src={closeIcon} alt="Close" className="w-6 h-6 ml-2" />
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
