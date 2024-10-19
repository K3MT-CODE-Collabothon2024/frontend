import React, { useState } from 'react';
import './App.css';
import BaseWidget from './widgets/BaseWidget';
import AccountSummaryWidget from './widgets/AccountSummary/AccountSummaryWidget';
import AccountSummaryPopup from './widgets/AccountSummary/AccountSummaryPopup';

function App() {
  return (
    <div className="App">
      <BaseWidget
        contentWidget={ <AccountSummaryWidget/> }
        contentPopup={ <AccountSummaryPopup/> }
      />
    </div>
  );
}

export default App;