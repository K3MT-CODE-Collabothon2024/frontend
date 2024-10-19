import React, { useState, useEffect } from "react";
import widgetData from "./widgetData.json"; // Import the JSON data
import "../../App.css";

const AddWidgetPopup: React.FC = () => {
  const [widgets, setWidgets] = useState<any[]>([]); // To store the widget data

  useEffect(() => {
    // Convert the JSON data into an array of widget objects
    const widgetArray = Object.entries(widgetData).map(([id, widget]: any) => ({
      id,
      ...widget,
    }));
    setWidgets(widgetArray);
  }, []);

  return (
    <div className="flex flex-col w-11/12 h-full items-center justify-between space-y-5">
      <h2 className="text-6xl text-center text-commerzBlue font-extrabold">
        Add <span className="text-stroke-blue">New</span> Widget
      </h2>

      <div className="flex flex-wrap w-11/12 h-5/6 space-x-4 gap-4 items-center justify-center">
        {/* Loop through widgets and display their data */}
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="border border-commerzBlue p-4 rounded-lg w-auto h-auto flex flex-col bg-slate-200 items-center justify-start shadow-2xl hover:scale-105 transition-all transition-300"
          >
            <h3 className="text-xl font-bold">{widget.title}</h3>
            <p className="text-sm">
              Size: {widget.width} x {widget.height}
            </p>

            {/* Widget preview */}
            <div className="bg-gray-100 w-full h-32 flex items-center justify-center mt-4">
              <PreviewWidget widgetPath={widget.content} />
            </div>

            <button className="mt-4 bg-commerzBlue text-commerzYellow p-2 rounded-lg shadow-lg">
              ADD WIDGET
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Dynamically import and preview the widget based on the widget content path
const PreviewWidget: React.FC<{ widgetPath: string }> = ({ widgetPath }) => {
    const [WidgetComponent, setWidgetComponent] = useState<React.FC | null>(null);
  
    useEffect(() => {
      const loadWidget = async () => {
        try {
          if (widgetPath) {
            // Dynamically import the component based on the widgetPath
            const importedWidget = await import(`../${widgetPath}`);
            setWidgetComponent(() => importedWidget.default); // Set the imported component
          } else {
            console.error("Widget path is undefined or empty:", widgetPath);
          }
        } catch (error) {
          console.error("Error loading widget:", error);
        }
      };
  
      loadWidget();
    }, [widgetPath]);
  
    // Render the widget component if available, else show a loading text
    return WidgetComponent ? <WidgetComponent /> : <p>Loading...</p>;
  };
  

export default AddWidgetPopup;
