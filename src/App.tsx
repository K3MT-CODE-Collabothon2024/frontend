
import "./App.css";
import Layout from "./layout/Layout";
import Header from "./widgets/Header";
import idData from "./data/currentWidgetIndexes.json";


function App() {
  return (
    <div className="App flex flex-col items-center justify-center">
      <Header />
      <div className="flex flex-col w-full  items-start justify-start px-10 py-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-2xl text-gray-500">Welcome back, Jackson Jazzman</p>
      </div>
      <div className=" w-full items-center justify-center ">
        <Layout ids={idData.ids} />
      </div>
    </div>
  );
}

export default App;