import { Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/home";
import FavPage from "./pages/fav";

// Components
import Navbar from "./components/navbar";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fav-list" element={<FavPage />} />
      </Routes>
    </>
  );
}

export default App;
