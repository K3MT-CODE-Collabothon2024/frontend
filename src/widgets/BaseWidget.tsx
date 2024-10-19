import React, { useState } from 'react';
import { motion } from 'framer-motion';
import closeIcon from '../icons/close_icon.png';

interface BaseWidgetProps {
  contentWidget: React.ReactNode;
}

const BaseWidget: React.FC<BaseWidgetProps> = ({ contentWidget }) => {
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

      
  
    </div>
  );
};

export default BaseWidget;
