import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Responsive,
  WidthProvider,
  Layout as RGLLayout,
} from "react-grid-layout";
import WidgetPositions from "./WidgetPositions"; // Import WidgetPositions
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import BaseWidget from "../widgets/BaseWidget";

// Wrap Responsive with WidthProvider for proper width handling
const ResponsiveGridLayout = WidthProvider(Responsive);

interface LayoutProps {
  ids: number[]; // Accept ids as an array of numbers
}

// Define the structure of the updated positions object
interface UpdatedPositions {
  [key: number]: {
    content: string;
    popup: string;
    width: number;
    height: number;
    startPosition: number;
  };
}

const Layout: React.FC<LayoutProps> = ({ ids }) => {
  const numCols = 4; // Number of columns in the grid
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup control
  const [selectedWidgetId, setSelectedWidgetId] = useState<number | null>(null); // State to hold the ID of the clicked widget
  const [layout, setLayout] = useState<RGLLayout[]>(() => {
    const savedPositions = localStorage.getItem("widgetPositions");
    if (savedPositions) {
      const parsedPositions = JSON.parse(savedPositions);
      return ids
        .map((id) => {
          const widget = parsedPositions[id] || WidgetPositions[id]; // Use saved positions or fallback to defaults
          if (!widget) return null;

          const index = widget.startPosition - 1; // Convert to 0-based index
          const x = index % numCols; // Calculate x position
          const y = Math.floor(index / numCols); // Calculate y position

          return {
            i: id.toString(), // Unique key for each grid item
            x, // Use calculated x position
            y, // Use calculated y position
            w: widget.width, // Use the widget width
            h: widget.height, // Use the widget height
          };
        })
        .filter((item): item is NonNullable<typeof item> => item !== null); // Filter out null values
    }

    // Fallback to default positions if no saved positions
    return ids
      .map((id) => {
        const widget = WidgetPositions[id];
        if (!widget) return null;

        const index = widget.startPosition - 1; // Convert to 0-based index
        const x = index % numCols; // Calculate x position
        const y = Math.floor(index / numCols); // Calculate y position

        return {
          i: id.toString(), // Unique key for each grid item
          x, // Use calculated x position
          y, // Use calculated y position
          w: widget.width, // Use the widget width
          h: widget.height, // Use the widget height
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null); // Filter out null values
  });

  const cols = { lg: numCols };
  const breakpoints = { lg: 100 };

  const handleLayoutChange = (newLayout: RGLLayout[]) => {
    setLayout(newLayout); // Update layout state with new layout

    // Create an object to hold updated positions
    const updatedPositions: UpdatedPositions = {};

    newLayout.forEach((item) => {
      const widgetId = parseInt(item.i);
      const widget = WidgetPositions[widgetId]; // Get the widget using its id

      if (widget) {
        // Update the startPosition based on the new index
        widget.startPosition = item.y * numCols + item.x + 1; // 1-based index
        updatedPositions[widgetId] = widget; // Store updated position
      }
    });

    // Save updated positions to localStorage
    localStorage.setItem("widgetPositions", JSON.stringify(updatedPositions));
  };

  const openPopup = (widgetId: number) => {
    setSelectedWidgetId(widgetId); // Set the selected widget ID
    setIsPopupOpen(true); // Open the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Function to close the popup
    setSelectedWidgetId(null); // Reset the selected widget ID
  };

  // Dynamically import the popup content based on the selected widget ID
  const renderPopupContent = () => {
    if (selectedWidgetId !== null) {
      const widget = WidgetPositions[selectedWidgetId];
      if (widget) {
        const PopupContent = require(`./${widget.popup}`).default; // Dynamically import the popup content based on the widget
        return <PopupContent />;
      }
    }
    return null; // Return null if no content is available
  };

  return (
    <>
      <ResponsiveGridLayout
        className="layout h-full"
        layouts={{ lg: layout }} // Layout configuration for large screens
        breakpoints={breakpoints} // Breakpoints for responsive design
        cols={cols} // Number of columns per screen size
        rowHeight={100} // Row height in pixels
        margin={[15, 15]} // Margin around each item (in pixels)
        isResizable={false} // Disable resizing
        compactType={"vertical"} // Disable compactType
        preventCollision={false} // Allow overlap or swap
        isDraggable={true} // Enable dragging
        onLayoutChange={handleLayoutChange} // Handle layout changes
      >
        {layout.map((item) => {
          const widget = WidgetPositions[parseInt(item.i)]; // Find the widget using its id

          if (!widget) return null; // Check if the widget exists before rendering

          const ContentComponent = require(`./${widget.content}`).default; // Dynamically import the component based on id

          return (
            <div
              key={item.i}
              className="grid-item items-center justify-center w-full h-full rounded-3xl"
              onClick={() => openPopup(parseInt(item.i))} // Open popup with the clicked widget ID
            >
              <BaseWidget
                contentWidget={React.createElement(ContentComponent)}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>

      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-gray-300 bg-opacity-75 z-40"></div>

          {/* Popup Container */}
          <div className="relative bg-white w-[80%] h-[80%] rounded-lg shadow-lg overflow-hidden z-50">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 w-8 h-8 text-white bg-red-500 rounded-full focus:outline-none flex items-center justify-center"
            >
              ×
            </button>

            {/* Popup Content */}
            <div className="flex flex-col justify-center items-center h-full p-4 overflow-auto">
              {renderPopupContent()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
