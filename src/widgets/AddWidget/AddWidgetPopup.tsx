import React, { useState, useEffect } from "react";
import widgetData from "./widgetData.json"; // Import the JSON data
import "../../App.css";

const AddWidgetPopup: React.FC = () => {
  const [widgets, setWidgets] = useState<any[]>([]); // To store the widget data
  const [showErrorPopup, setShowErrorPopup] = useState(false); // To handle the popup
  const [errorMessage, setErrorMessage] = useState(""); // To store error message

  useEffect(() => {
    const widgetArray = Object.entries(widgetData)
      .map(([id, widget]: any) => ({
        id,
        ...widget,
      }))
      // Filter out the widget with id === 0 so it won't be displayed
      .filter((widget) => widget.id !== "0");
    
    setWidgets(widgetArray);
  }, []);

  const handleAddWidget = (widgetId: number, widgetTitle: string) => {
    const widgetExists = addWidgetToDashboard(widgetId);
    if (!widgetExists) {
      setErrorMessage(`Widget is already added.`);
      setShowErrorPopup(true);
    }
  };

  return (
    <div className="flex flex-col w-11/12 h-full items-center justify-between space-y-5">
      <h2 className="text-6xl text-center text-commerzBlue font-extrabold">
        Add <span className="text-stroke-blue">New</span> Widget
      </h2>

      <div className="flex flex-wrap w-11/12 h-full space-x-4 gap-10 items-center justify-center">
        {/* Loop through widgets and display their data */}
        {widgets.map((widget) => (
          <div
            key={widget.id}
            className="border border-commerzBlue p-4 rounded-lg w-auto max-w-96 h-auto flex flex-col bg-slate-200 items-center justify-start shadow-2xl hover:scale-105 transition-all transition-300"
          >
            <h3 className="text-xl font-bold">{widget.title}</h3>
            <p className="text-sm">
              Size: {widget.width} x {widget.height}
            </p>

            {/* Widget preview */}
            <div className="bg-gray-100 w-full h-32 flex items-center justify-center mt-4">
              <PreviewWidget widgetPath={widget.content} />
            </div>

            <button
              onClick={() => handleAddWidget(widget.id, widget.title)}
              className="mt-4 bg-commerzBlue text-commerzYellow p-2 rounded-lg shadow-lg"
            >
              ADD WIDGET
            </button>
          </div>
        ))}
      </div>

      {/* Popup for error when widget is already added */}
      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-2xl border-2 border-red-500">
            <p className="text-red-500 font-bold">{errorMessage}</p>
            <button
              className="mt-4 bg-red-500 text-white p-2 rounded-lg"
              onClick={() => setShowErrorPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const addWidgetToDashboard = (id: number): boolean => {
  const widgetId = Number(id);
  const existingIds = JSON.parse(localStorage.getItem("widgetIds") || "[]") as number[];

  if (!existingIds.includes(widgetId)) {
    existingIds.push(widgetId);
    localStorage.setItem("widgetIds", JSON.stringify(existingIds));
    window.location.reload();
    return true; // Widget successfully added
  } else {
    console.log(`Widget is already added.`);
    return false; // Widget was already added
  }
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
