import { use, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";
import AthletesPage from "./pages/AthletesPage";
import HomePage from "./pages/HomePage/HomePage";
import SideMenu from "./components/SideMenu/SideMenu";

function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  return (
    <>
      <Header isLogedIn={isLogedIn}></Header>
      <div className="main-content-wrapper">
        <SideMenu></SideMenu>
        <div className="main-content">
          <HomePage></HomePage>
          {/* <AthletesPage></AthletesPage> */}
        </div>
      </div>
    </>
  );
}

export default App;
