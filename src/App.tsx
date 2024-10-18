import React from 'react';
import './App.css';
import AccountSummaryWidget from './widgets/AccountSummaryWidget';
import BaseWidget from './widgets/BaseWidget';

function App() {
  return (
    <div className="App">
      {/* Dodanie BaseWidget, który zawiera AccountSummaryWidget jako content */}
      <BaseWidget
        isWide={false} // Ustawia szerokość widgetu
        content={<AccountSummaryWidget />} // Wstawienie AccountSummaryWidget jako zawartość
      />
    </div>
  );
}

export default App;
