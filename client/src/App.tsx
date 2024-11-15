import "./App.css";
import SetupProjectPage from "./pages/SetupProjectPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/DashboardPage";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/project/new" element={<SetupProjectPage />} />
        <Route path="/dashboard/:projectId" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
