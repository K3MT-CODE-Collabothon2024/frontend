import { ftruncate } from "fs";
import "./App.css";
import logo from "./logo.svg";
import DueTasksWidget from "./widgets/DueTasksWidget";
import Header from "./widgets/header";

function App() {
  return (
    <div className="App">
     <Header />
      <div className="flex items-center justify-center w-full h-screen"> 
        <DueTasksWidget isWide ={false} tasks ={tasks} />
     </div>
    </div>
  );
}

export default App;