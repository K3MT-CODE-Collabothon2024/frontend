import React, { useState } from 'react';
import './App.css';
import BaseWidget from './widgets/BaseWidget';
import AccountSummaryWidgetTight from './widgets/AccountSummary/AccountSummaryWidgetTight';
import AccountSummaryPopup from './widgets/AccountSummary/AccountSummaryPopup';
import AccountSummaryWidgetWide from './widgets/AccountSummary/AccountSummaryWidgetWide';
import AccountAssets from './widgets/AccountSummary/AccountAssets';

function App() {
  return (
    <div className="App">
      < BaseWidget contentWidget={<AccountAssets/>}/>
    </div>
  );
}

export default App;
