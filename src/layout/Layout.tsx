import React, { useState, useEffect, useRef } from "react";
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

const ResponsiveGridLayout = WidthProvider(Responsive);

interface LayoutProps {
  ids: number[];
}

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
  const numCols = 4;
  const [indexes, setIndexes] = useState<number[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedWidgetId, setSelectedWidgetId] = useState<number | null>(null);
  const [layout, setLayout] = useState<RGLLayout[]>([]);
  const [draggingWidgetId, setDraggingWidgetId] = useState<number | null>(null);
  const [showDeleteArea, setShowDeleteArea] = useState(false);
  const [dragging, setDragging] = useState(false); // New state to track dragging

  const deleteBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const existingIds = JSON.parse(
      localStorage.getItem("widgetIds") || "[]"
    ) as number[];
    if (existingIds.length > 0) {
      setIndexes(existingIds);
    } else {
      setIndexes(ids);
      localStorage.setItem("widgetIds", JSON.stringify(ids));
    }

    const savedPositions = localStorage.getItem("widgetPositions");
    const parsedPositions = savedPositions ? JSON.parse(savedPositions) : {};

    const newLayout = existingIds
      .map((id) => {
        const widget = parsedPositions[id] || WidgetPositions[id];
        if (!widget) return null;

        const index = widget.startPosition - 1;
        const x = index % numCols;
        const y = Math.floor(index / numCols);

        return {
          i: id.toString(),
          x,
          y,
          w: widget.width,
          h: widget.height,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    setLayout(newLayout);
  }, []);

  const handleLayoutChange = (newLayout: RGLLayout[]) => {
    const updatedPositions: UpdatedPositions = {};

    newLayout.forEach((item) => {
      const widgetId = parseInt(item.i);
      const widget = WidgetPositions[widgetId];

      if (widget) {
        const newStartPosition = item.y * numCols + item.x + 1;
        updatedPositions[widgetId] = {
          ...widget,
          startPosition: newStartPosition,
        };
      }
    });

    localStorage.setItem("widgetPositions", JSON.stringify(updatedPositions));
    setLayout(newLayout);
  };

  const openPopup = (widgetId: number) => {
    // if (!dragging) {
      setSelectedWidgetId(widgetId);
      setIsPopupOpen(true);
   // }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedWidgetId(null);
  };

  const onDragStart = (layout: RGLLayout[], oldItem: any) => {
    // setDragging(true); // Set dragging to true when drag starts
    setDraggingWidgetId(parseInt(oldItem.i));
    setShowDeleteArea(true);
  };

  const onDragStop = (layout: RGLLayout[], oldItem: any, newItem: any) => {
    setShowDeleteArea(false);
    setDraggingWidgetId(null);

    setTimeout(() => {
      setDragging(false); // Set dragging to false after a small delay
    }, 100); // 100ms delay to avoid onClick firing immediately after drag

    
  };

  

  const renderPopupContent = () => {
    if (selectedWidgetId !== null) {
      const widget = WidgetPositions[selectedWidgetId];
      if (widget) {
        const PopupContent = require(`../widgets/${widget.popup}`).default;
        return <PopupContent />;
      }
    }
    return null;
  };

  return (
    <>
      <ResponsiveGridLayout
        className="layout h-full"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 100 }}
        cols={{ lg: numCols }}
        rowHeight={130}
        margin={[15, 15]}
        isResizable={false}
        compactType={"vertical"}
        preventCollision={false}
        isDraggable={true}
        onLayoutChange={handleLayoutChange}
        onDragStart={onDragStart}
        onDragStop={onDragStop}
      >
        {layout.map((item) => {
          const widget = WidgetPositions[parseInt(item.i)];

          if (!widget) return null;

          const ContentComponent =
            require(`../widgets/${widget.content}`).default;

          return (
            <div
              key={item.i}
              className="grid-item items-center justify-center w-full h-full rounded-3xl"
              data-grid-id={item.i}
              onClick={() => openPopup(parseInt(item.i))}
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
        {showDeleteArea && (
          <motion.div
            ref={deleteBoxRef}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-red-500 flex items-center justify-center shadow-lg"
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.5,
            }}
          >
            <span className="text-white text-xl">Delete</span>
          </motion.div>
        )}
      </AnimatePresence>
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
