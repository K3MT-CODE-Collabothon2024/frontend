import React from 'react';

const AddWidgetPopup: React.FC = () => {
    return (
        <div className="add-widget-popup">
            <h2>Add New Widget</h2>
            <form>
                <div>
                    <label htmlFor="widgetName">Widget Name:</label>
                    <input type="text" id="widgetName" name="widgetName" />
                </div>
                <div>
                    <label htmlFor="widgetDescription">Widget Description:</label>
                    <textarea id="widgetDescription" name="widgetDescription"></textarea>
                </div>
                <button type="submit">Add Widget</button>
            </form>
        </div>
    );
};

export default AddWidgetPopup;