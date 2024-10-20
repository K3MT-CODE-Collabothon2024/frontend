import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Responsive,
  WidthProvider,
  Layout as RGLLayout,
} from "react-grid-layout";
import WidgetPositions from "./WidgetPositions";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import BaseWidget from "../widgets/BaseWidget";
import closeIcon from "../icons/close_icon.png";
import AddWidget from "../widgets/AddWidget/AddWidget";

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
  const [indexes, setIndexes] = useState<number[]>([]); // State to hold the widget IDs
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Popup control
  const [selectedWidgetId, setSelectedWidgetId] = useState<number | null>(null); // State to hold the ID of the clicked widget
  const [layout, setLayout] = useState<RGLLayout[]>([]); // Initialize layout state

  useEffect(() => {
    // Save ids to local storage if they don't already exist
    const existingIds = JSON.parse(
      localStorage.getItem("widgetIds") || "[]"
    ) as number[];
    console.log("Existing widget IDs in local storage:");
    console.log(existingIds);
    if (existingIds.length === 0) {
      localStorage.setItem("widgetPositions", JSON.stringify(WidgetPositions));
      localStorage.setItem("widgetIds", JSON.stringify(ids));
      console.log("Saved widget IDs to local storage:", ids);
    }
    setIndexes(ids);
  }, [ids]);

  const [dragStartPos, setDragStartPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    // Load widget IDs from local storage
    const existingIds = JSON.parse(
      localStorage.getItem("widgetIds") || "[]"
    ) as number[];
    if (existingIds.length > 0) {
      setIndexes(existingIds); // Set the widget IDs if they exist
    } else {
      setIndexes(ids); // Otherwise, set from props
      localStorage.setItem("widgetIds", JSON.stringify(ids)); // Save ids to local storage
    }

    // Load widget positions from local storage
    const savedPositions = localStorage.getItem("widgetPositions");
    const parsedPositions = savedPositions ? JSON.parse(savedPositions) : {};

    const newLayout = existingIds
      .map((id) => {
        const widget = parsedPositions[id] || WidgetPositions[id]; // Fallback to default if not found
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
      .filter((item): item is NonNullable<typeof item> => item !== null);

    setLayout(newLayout); // Update layout state
  }, []); // Run only once on mount

  const handleLayoutChange = (newLayout: RGLLayout[]) => {
    // Update layout state with new layout

    // Retrieve existing positions from local storage
    const savedPositions = localStorage.getItem("widgetPositions");
    const parsedPositions = savedPositions ? JSON.parse(savedPositions) : {};

    // Create an object to hold updated positions
    const updatedPositions: UpdatedPositions = { ...parsedPositions }; // Start with existing positions

    newLayout.forEach((item) => {
      console.log(item);
      const widgetId = parseInt(item.i);
      const widget = WidgetPositions[widgetId]; // Get the widget using its id

      if (widget) {
        // Update the startPosition based on the new index
        const newStartPosition = item.y * numCols + item.x + 1; // 1-based index
        updatedPositions[widgetId] = {
          ...widget, // Preserve other properties
          startPosition: newStartPosition, // Update only startPosition
        };
      }
      setLayout(newLayout);
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
        const PopupContent = require(`../widgets/${widget.popup}`).default; // Dynamically import the popup content based on the widget
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
        breakpoints={{ lg: 100 }} // Breakpoints for responsive design
        cols={{ lg: numCols }} // Number of columns per screen size
        rowHeight={130} // Row height in pixels
        margin={[15, 15]} // Margin around each item (in pixels)
        isResizable={false} // Disable resizing
        compactType={"vertical"} // Disable compactType
        preventCollision={false} // Allow overlap or swap
        isDraggable={true} // Enable dragging
        onLayoutChange={handleLayoutChange} // Handle layout changes
        onDragStart={(layout, oldItem) => {
          setDragStartPos({ x: oldItem.x, y: oldItem.y }); // Record the drag start position
        }}
        onDragStop={(layout, oldItem, newItem) => {
          const distanceX = Math.abs(newItem.x - dragStartPos!.x);
          const distanceY = Math.abs(newItem.y - dragStartPos!.y);

          if (distanceX < 1 && distanceY < 1) {
            openPopup(parseInt(newItem.i)); // Trigger openPopup if no significant movement
          }

          setDragStartPos(null); // Reset drag start position after drag ends
        }}
      >
        {layout.map((item) => {
          const widget = WidgetPositions[parseInt(item.i)]; // Find the widget using its id

          if (!widget) return null; // Check if the widget exists before rendering

          const ContentComponent =
            require(`../widgets/${widget.content}`).default; // Dynamically import the component based on id

          return (
            <div
              key={item.i}
              className="grid-item items-center justify-center w-full h-full rounded-3xl"
            >
              {widget.content === "AddWidget/AddWidget" ? (
                <AddWidget />
              ) : (
                <BaseWidget
                  contentWidget={React.createElement(ContentComponent)}
                />
              )}
            </div>
          );
        })}
      </ResponsiveGridLayout>

      <AnimatePresence>
        {isPopupOpen && (
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
                className="bg-commerzBrightGreen p-8 rounded-lg w-11/12 h-4/5 overflow-y-auto relative shadow-xl"
                initial={{ y: "100vh" }}
                animate={{ y: 0 }}
                exit={{ y: "100vh" }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              >
                <button
                  onClick={closePopup}
                  className="absolute top-0 right-0 w-30 h-30 text-commerzBlue p-2 flex items-center justify-center"
                >
                  <img src={closeIcon} alt="Close" className="w-6 h-6 ml-2" />
                </button>

                <div className="flex justify-center items-center h-full w-full ">
                  {renderPopupContent()}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Layout;
