import React, { useState } from 'react';
import './App.css';
import BaseWidget from './widgets/BaseWidget';
import AccountSummaryWidgetTight from './widgets/AccountSummary/AccountSummaryWidgetTight';
import AccountSummaryPopup from './widgets/AccountSummary/AccountSummaryPopup';
import AccountSummaryWidgetWide from './widgets/AccountSummary/AccountSummaryWidgetWide';
function App() {
  return (
    <div className="App">
      <BaseWidget
        contentWidget={ <AccountSummaryWidgetWide/> }
        contentPopup={ <AccountSummaryPopup/> }
      />
    </div>
  );
}

export default App;