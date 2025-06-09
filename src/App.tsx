import { useState } from "react";
import "./App.css";
import ButtonAppBar from "./components/Header/Header";
import SideMenu from "./components/SideMenu/SideMenu";
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
import RegisteredTeamsPage from "./pages/TeamsPage/RegisteredTeamsPage";
import { useFetchMeData } from "./hooks/useAuth";
import ProtectedRoute from "./access/ProtectedRoute";
import NewEventPage from "./pages/CompetitionsPage/NewEventPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";

function App() {
  const { data: meData, isLoading: isMeLoading } = useFetchMeData();
  const userRole = meData?.data.role;

  return (
    <BrowserRouter>
      <ButtonAppBar></ButtonAppBar>
      <SideMenu></SideMenu>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="register_account/" element={<RegisterAccountPage />} />
        <Route path="login/" element={<LoginPage />} />
        <Route
          path="athletes/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<AthletesPage />}
                allowedRoles={["dojo", "national_association"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="athletes/:id/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<SingleAthletePage />}
                allowedRoles={["dojo", "national_association"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="athletes/new_athlete/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<NewAthletePage />}
                allowedRoles={["dojo"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="teams/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<TeamsPage />}
                allowedRoles={["dojo", "national_association"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="teams/:id/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<SingleTeamPage />}
                allowedRoles={["dojo", "national_association"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="teams/new_team/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<NewTeamPage />}
                allowedRoles={["dojo"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="events/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<CompetitionsPage />}
                allowedRoles={["dojo", "national_association"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="events/new_event/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<NewEventPage />}
                allowedRoles={["national_association"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="notifications_manager/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<NotificationsPage />}
                allowedRoles={["national_association"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="events/:id/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<CompetitionCard />}
                allowedRoles={["dojo", "national_association"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="events/:id/individuals/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<IndividualsPage />}
                allowedRoles={["dojo", "national_association"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="events/:id/teams/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<RegisteredTeamsPage />}
                allowedRoles={["dojo", "national_association"]}
                userRole={userRole}
              />
            )
          }
        />
        <Route
          path="rules/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<RulesPage />}
                allowedRoles={["dojo"]}
                userRole={userRole}
                allowUnauthenticated={true}
              />
            )
          }
        />
        <Route
          path="classifications/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<ClassificationsPage />}
                allowedRoles={["dojo"]}
                userRole={userRole}
                allowUnauthenticated={true}
              />
            )
          }
        />
        <Route
          path="help/"
          element={
            isMeLoading ? null : (
              <ProtectedRoute
                element={<HelpPage />}
                allowedRoles={["dojo"]}
                userRole={userRole}
                allowUnauthenticated={true}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
