import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Interfejs dla podstawowego widgetu
interface BaseWidgetProps {
  isWide: boolean;  // Określa, czy widget ma być szeroki
  content: React.ReactNode;  // Zawartość widgetu, którą można modyfikować w dziedziczących widgetach
}

const BaseWidget: React.FC<BaseWidgetProps> = ({ isWide, content }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  // Funkcja do obsługi kliknięcia na widget
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  // Funkcja do zamknięcia pop-upu
  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="flex justify-center items-center my-4">
      {/* Widget, który działa jak przycisk */}
      <motion.div
        className={`relative cursor-pointer bg-[#d1f7e8] text-commerzBlue rounded-lg ${
          isWide ? 'w-full md:w-2/3' : 'w-full md:w-1/3'
        } min-w-[300px] min-h-[250px] flex flex-col justify-center items-center`}  
        onClick={togglePopup} // Cały widget jest przyciskiem
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Zawartość widgetu */}
        <div className="text-center mt-4 flex-grow w-full p-2 overflow-hidden flex items-center justify-center">
          {content}
        </div>
      </motion.div>

      {/* Pop-up z animacją i tłem na pełnym ekranie */}
      {isPopupVisible && (
        <>
          {/* Statyczne tło zajmujące całą stronę */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-40"></div>

          {/* Animacja pop-upu */}
          <motion.div
            className="fixed inset-0 flex justify-center items-center z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white p-8 rounded-lg w-full max-w-3xl overflow-y-auto relative max-h-[80vh]" 
              initial={{ y: '100vh' }}
              animate={{ y: 0 }}
              exit={{ y: '100vh' }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              {/* Przycisk zamknięcia pop-upu */}
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full focus:outline-none"
              >
                ×
              </button>

              {/* Zawartość pop-up, która może być zmieniana przez widget dziedziczący */}
              <div className="flex flex-col justify-center items-center w-full">
                {content}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default BaseWidget;