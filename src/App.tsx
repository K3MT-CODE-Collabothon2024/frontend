import "./App.css";
import logo from "./logo.svg";
import Header from "./widgets/header";
import AccountSummaryWidget from "./widgets/AccountSummaryWidget";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex items-center justify-center w-full h-screen">
      
        <AccountSummaryWidget/>
      </div>
    </div>
  );
}

export default App;
