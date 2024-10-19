import React from 'react';
import './App.css';
import AccountSummaryWidget from './widgets/AccountSummaryWidget';
import AccountSummaryPopup from './widgets/AccountSummaryPopup';
import BaseWidget from './widgets/BaseWidget';

function App() {
  return (
    <div className="App">
      {/* Dodanie BaseWidget, który zawiera AccountSummaryWidget jako content */}
      <BaseWidget
        isWide={false} // Ustawia szerokość widgetu
        contentWidget={<AccountSummaryWidget />} // Wstawienie AccountSummaryWidget jako zawartość
        contentPopup={<AccountSummaryPopup />}
      />
    </div>
  );
}

export default App;
