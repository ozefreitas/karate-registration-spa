import { useState } from "react";
import "./App.css";
import MainAppLayout  from "./layouts/MainAppLayout";
import { DisplayPanelLayout } from "./layouts/DisplayPanelLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AthletesPage from "./pages/AthletesPage/AthletesPage";
import CompetitionsPage from "./pages/CompetitionsPage/CompetitionsPage";
import CompetitionCard from "./components/CompetitionCards/CompetitionCard";
import HomePage from "./pages/HomePage/HomePage";
import AdminHomePage from "./pages/HomePage/AdminHomePage";
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
import UnAuthorizedPage from "./pages/ErrorPages/UnAuthorizedPage";
import NotFoundPage from "./pages/ErrorPages/ServerErrorPage";
import EventAllRegistryPage from "./components/CompetitionCards/EventAllRegistryPage";
import MainSettingsPage from "./pages/SettingsPage/MainSettingsPage";
import ResultsMainPage from "./pages/ResultsMonitorPage/ResultsMainPage";
import DisplayPage from "./pages/ResultsMonitorPage/DisplayPage";
import { useEffect } from "react";

function App() {
  const { data: meData, isLoading: isMeLoading } = useFetchMeData();
  const userRole: string = meData?.data.role;

  useEffect(() => {
    if (location.pathname === "/display_panel/") {
      document.body.classList.add("display-mode");
    } else {
      document.body.classList.remove("display-mode");
    }
  }, [location]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainAppLayout me={meData} />}>
          <Route
            path="/"
            element={
              userRole == "national_association" ? (
                <AdminHomePage />
              ) : (
                <HomePage userRole={userRole} />
              )
            }
          />
          <Route path="register_account/" element={<RegisterAccountPage />} />
          <Route path="login/" element={<LoginPage />} />
          <Route
            path="athletes/"
            element={
              isMeLoading ? null : (
                <ProtectedRoute
                  element={<AthletesPage userRole={userRole} />}
                  allowedRoles={["subed_dojo", "national_association"]}
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
                  allowedRoles={["subed_dojo", "national_association"]}
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
                  allowedRoles={["national_association"]}
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
                  element={<TeamsPage userRole={userRole} />}
                  allowedRoles={["subed_dojo", "national_association"]}
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
                  allowedRoles={["subed_dojo", "national_association"]}
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
                  allowedRoles={["subed_dojo"]}
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
                  allowedRoles={[
                    "free_dojo",
                    "subed_dojo",
                    "national_association",
                  ]}
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
                  element={<CompetitionCard userRole={userRole} />}
                  allowedRoles={[
                    "free_dojo",
                    "subed_dojo",
                    "national_association",
                  ]}
                  userRole={userRole}
                />
              )
            }
          />
          <Route
            path="events/:id/all_registry"
            element={
              isMeLoading ? null : (
                <ProtectedRoute
                  element={<EventAllRegistryPage userRole={userRole} />}
                  allowedRoles={["subed_dojo", "national_association"]}
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
                  element={<IndividualsPage userRole={userRole} />}
                  allowedRoles={[
                    "free_dojo",
                    "subed_dojo",
                    "national_association",
                  ]}
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
                  allowedRoles={[
                    "free_dojo",
                    "subed_dojo",
                    "national_association",
                  ]}
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
                  allowedRoles={["free_dojo", "subed_dojo"]}
                  userRole={userRole}
                  allowUnauthenticated
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
                  allowedRoles={["free_dojo", "subed_dojo"]}
                  userRole={userRole}
                  allowUnauthenticated
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
                  allowedRoles={["free_dojo", "subed_dojo"]}
                  userRole={userRole}
                  allowUnauthenticated
                />
              )
            }
          />
          <Route
            path="results_display/"
            element={
              isMeLoading ? null : (
                <ProtectedRoute
                  element={<ResultsMainPage />}
                  allowedRoles={["national_association"]}
                  userRole={userRole}
                />
              )
            }
          />
          <Route
            path="settings/"
            element={
              isMeLoading ? null : (
                <ProtectedRoute
                  element={<MainSettingsPage />}
                  allowedRoles={["national_association"]}
                  userRole={userRole}
                />
              )
            }
          />
          <Route path="unauthorized/" element={<UnAuthorizedPage />} />
          <Route path="not_found/" element={<NotFoundPage />} />
        </Route>
        <Route element={<DisplayPanelLayout />}>
          <Route path="/display_panel/" element={<DisplayPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
