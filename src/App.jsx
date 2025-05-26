import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";


import Home from "./components/Home";
import AdminPortal from "./components/Admin/AdminPortal";

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPortal />} />
 
      </Routes>
    </Router>
  );
}

export default App;
