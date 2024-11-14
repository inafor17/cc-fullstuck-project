import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Dashboard } from "./components/dashboard";
import SetupProjectPage from "./pages/SetupProjectPage";

function App() {
  const [count, setCount] = useState(0);

  return <SetupProjectPage />;
}

export default App;
