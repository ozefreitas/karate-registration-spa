import { use, useState } from "react";
import "./App.css";
import ButtonAppBar from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AthletesPage from "./pages/AthletesPage/AthletesPage";
import CompetitionsPage from "./pages/CompetitionsPage/CompetitionsPage";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  return (
    <>
      <BrowserRouter>
        <ButtonAppBar></ButtonAppBar>
        <SideMenu></SideMenu>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route index element={<Home />} /> */}
          <Route path="athletes/" element={<AthletesPage />} />
          <Route path="competitions/" element={<CompetitionsPage />} />
        </Routes>
      </BrowserRouter>
      <div className="main-content">
        {/* <HomePage></HomePage> */}
        {/* <AthletesPage></AthletesPage> */}
      </div>
    </>
  );
}

export default App;
