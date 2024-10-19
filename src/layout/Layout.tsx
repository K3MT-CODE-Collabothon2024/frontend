import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import WidgetPositions from "./WidgetPositions"; // Import WidgetWidths
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Wrap Responsive with WidthProvider for proper width handling
const ResponsiveGridLayout = WidthProvider(Responsive);

interface LayoutProps {
  ids: number[]; // Accept ids as an array of numbers
}

const Layout: React.FC<LayoutProps> = ({ ids }) => {
  // Define the layout based on WidgetWidths and ids
  const layout = ids.map((id) => {
    const widget = WidgetPositions[id]; // Get the widget data for each id
    if (!widget) return null; // Return null if widget is not found
  
    const index = widget.startPosition - 1; // Convert to 0-based index for calculations
    const x = (index % 5); // Assuming 5 columns
    const y = Math.floor(index / 5); // Calculate row based on index
  
    return {
      i: id.toString(), // Unique key for each grid item
      x, // Use calculated x position
      y, // Use calculated y position
      w: widget.width, // Use the widget width
      h: widget.height, // Use the widget height
    };
  });

  const filteredLayout = layout.filter((item): item is NonNullable<typeof item> => item !== null); // Filter out null values

  const cols = { lg: 5, md: 10, sm: 6, xs: 4, xxs: 2 };

  const breakpoints = { lg: 1000, md: 996, sm: 768, xs: 480, xxs: 0 };

  return (
    <ResponsiveGridLayout
      className="layout h-full bg-slate-600"
      layouts={{ lg: filteredLayout }} // Layout configuration for large screens
      breakpoints={breakpoints} // Breakpoints for responsive design
      cols={cols} // Number of columns per screen size
      rowHeight={100} // Row height in pixels
      margin={[10, 10]} // Margin around each item (in pixels)
      isResizable={false} // Disable resizing
      compactType={"vertical"} // Disable compactType
      preventCollision={false} // Allow overlap or swap
    >
      {filteredLayout.map((item) => {
        const widget = WidgetPositions[parseInt(item.i)]; // Find the widget using its id

        if (!widget) return null; // Check if the widget exists before rendering

        const Component = require(`./${widget.id}`).default; // Dynamically import the component based on id

        return (
          <div
            key={item.i}
            className="grid-item items-center justify-center w-full h-full overflow-hidden rounded-3xl"
          >
            <Component /> {/* Render the component */}
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default Layout;
