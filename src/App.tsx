import './App.css';
import AccountAssets from './widgets/AccountSummaryWidget/AccountAssets';
import IncomeExpensesChart from './widgets/AccountSummaryWidget/IncomeExpensesChart';
import BaseWidget from './widgets/BaseWidget';
import AccountAssetsSmaller from './widgets/AccountSummaryWidget/AccountAssetsSmaller';
import IncomeExpensesChartSmaller from './widgets/AccountSummaryWidget/IncomeExpensesChartSmaller'

function App() {
  return (
    <div className="App">
      <BaseWidget contentWidget={<AccountAssetsSmaller/>}/>
    </div>
  );
}

export default App;
