import { use, useState } from "react";
import "./App.css";
import ButtonAppBar from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AthletesPage from "./pages/AthletesPage/AthletesPage";
import CompetitionsPage from "./pages/CompetitionsPage/CompetitionsPage";
import CompetitionCard from "./components/CompetitionCards/CompetitionCard";
import HomePage from "./pages/HomePage/HomePage";
import ClassificationsPage from "./pages/ClassificationsPage/ClassificationsPage";
import RulesPage from "./pages/RulesPage/RulesPage";
import HelpPage from "./pages/HelpPage/HelpPage";
import RegisterAccountPage from "./pages/auth/RegisterAccountPage";
import LoginPage from "./pages/auth/LoginPage";
import NewAthletePage from "./pages/AthletesPage/NewAthletePage";
import SingleAthletePage from "./pages/AthletesPage/SingleAthletePage";
import TeamsPage from "./pages/TeamsPage/TeamsPage";
import SingleTeamPage from "./pages/TeamsPage/SingleTeamPage";
import NewTeamPage from "./pages/TeamsPage/NewTeamPage";
import IndividualsPage from "./pages/IndividualsPage/IndividualsPage";
import RegisterIndividualPage from "./pages/IndividualsPage/RegisterIndividualPage";
import RegisterTeamPage from "./pages/TeamsPage/RegisterTeamPage";
import RegisteredTeamsPage from "./pages/TeamsPage/RegisteredTeamsPage";

function App() {
  return (
    <BrowserRouter>
      <ButtonAppBar></ButtonAppBar>
      <SideMenu></SideMenu>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route index element={<Home />} /> */}
        <Route path="register_account/" element={<RegisterAccountPage />} />
        <Route path="login/" element={<LoginPage />} />
        <Route path="athletes/" element={<AthletesPage />} />
        <Route path="athletes/:id/" element={<SingleAthletePage />} />
        <Route path="athletes/new_athlete/" element={<NewAthletePage />} />
        <Route path="teams/" element={<TeamsPage />} />
        <Route path="teams/:id/" element={<SingleTeamPage />} />
        <Route path="teams/new_team/" element={<NewTeamPage />} />
        <Route path="events/" element={<CompetitionsPage />} />
        <Route path="events/:id/" element={<CompetitionCard />} />
        <Route
          path="events/:id/individuals/"
          element={<IndividualsPage />}
        />
        <Route
          path="events/:id/individuals/register/"
          element={<RegisterIndividualPage />}
        />
        <Route
          path="events/:id/teams/"
          element={<RegisteredTeamsPage />}
        />
        <Route
          path="events/:id/teams/register/"
          element={<RegisterTeamPage />}
        />
        <Route path="rules/" element={<RulesPage />} />
        <Route path="classifications/" element={<ClassificationsPage />} />
        <Route path="help/" element={<HelpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
