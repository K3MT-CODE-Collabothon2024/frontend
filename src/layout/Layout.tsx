import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// Wrap Responsive with WidthProvider for proper width handling
const ResponsiveGridLayout = WidthProvider(Responsive);

interface LayoutProps {
  children: React.ReactNode[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Define how many items per row based on the screen width
  const itemsPerRow = 4; // Change this as needed

  // Define the layout for all screen sizes
  const layout = children.map((_, index) => ({
    i: index.toString(), // Unique key for each grid item
    x: (index % itemsPerRow) * 3, // Position on x-axis
    y: Math.floor(index / itemsPerRow), // Position on y-axis
    w: 2, // Width (in grid units)
    h: 2, // Height (in grid units)
    minH: 2,
    minW: 2, // Minimum width (in grid units)
    maxW: 4, // Maximum width (in grid units)
    maxH: 2, // Maximum height (in grid units)
  }));

  // Define the number of columns for different screen sizes
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  // Define breakpoints for screen sizes
  const breakpoints = { lg: 1000, md: 996, sm: 768, xs: 480, xxs: 0 };

  return (
    <ResponsiveGridLayout
      className="layout h-full bg-slate-600"
      layouts={{ lg: layout }} // Layout configuration for large screens (can define for other breakpoints too)
      breakpoints={breakpoints} // Breakpoints for responsive design
      cols={cols} // Number of columns per screen size
      rowHeight={150} // Row height in pixels
      width={window.innerWidth * 0.2} // Total width of the grid layout (80% of the screen width)
      margin={[10, 10]} // Margin around each item (in pixels)
      isResizable={true} // Enable resizing
      compactType={"vertical"} // Disable compactType
      preventCollision={false} // Prevent collisions
      maxRows={itemsPerRow}
    >
      {children.map((child, index) => (
        <div
          key={index}
          className="grid-item items-center justify-center w-full h-full overflow-hidden rounded-3xl"
        >
          {child}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default Layout;
