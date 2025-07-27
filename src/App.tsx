import "./App.css";
import MainAppLayout from "./layouts/MainAppLayout";
import { DisplayPanelLayout } from "./layouts/DisplayPanelLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AthletesPage from "./pages/AthletesPage/AthletesPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import EventCard from "./components/EventCards/EventCard";
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
import NewEventPage from "./pages/EventsPage/NewEventPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import UnAuthorizedPage from "./pages/ErrorPages/UnAuthorizedPage";
import NotFoundPage from "./pages/ErrorPages/ServerErrorPage";
import EventAllRegistryPage from "./components/EventCards/EventAllRegistryPage";
import MainSettingsPage from "./pages/SettingsPage/MainSettingsPage";
import ResultsMainPage from "./pages/ResultsMonitorPage/ResultsMainPage";
import DisplayPage from "./pages/ResultsMonitorPage/DisplayPage";
import DrawPage from "./pages/DrawPage/DrawPage";
import GenerateDrawPage from "./pages/DrawPage/GenerateDrawPage";
import NewCategoryPage from "./pages/CategoriesPage/NewCategoryPage";
import CategoriesPage from "./pages/CategoriesPage/CategoriesPage";
import KataElim from "./pages/DisplayPanelPages/KataElim";
import KataFinal from "./pages/DisplayPanelPages/KataFinal";
import KataTeam from "./pages/DisplayPanelPages/KataTeam";
import KumiteIndiv from "./pages/DisplayPanelPages/KumiteIndiv";
import KumiteTeam from "./pages/DisplayPanelPages/KumiteTeam";
import { useEffect } from "react";
import { useAuth } from "./access/GlobalAuthProvider";

function App() {
  const { user, isAuthLoading } = useAuth();
  const userRole = user?.data.role;

  useEffect(() => {
    if (location.pathname.split("/").includes("display_panel")) {
      document.body.classList.add("display-mode");
    } else {
      document.body.classList.remove("display-mode");
    }
  }, [location]);

  if (isAuthLoading) {
    return <div></div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainAppLayout me={user} />}>
          <Route
            path="/"
            element={
              userRole == "national_association" ? (
                <AdminHomePage userRole={userRole} />
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
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<AthletesPage userRole={userRole} />}
                  allowedRoles={["subed_dojo", "national_association"]}
                />
              )
            }
          />
          <Route
            path="athletes/:id/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<SingleAthletePage />}
                  allowedRoles={["subed_dojo", "national_association"]}
                />
              )
            }
          />
          <Route
            path="athletes/new_athlete/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<NewAthletePage />}
                  allowedRoles={["national_association"]}
                />
              )
            }
          />
          <Route
            path="teams/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<TeamsPage userRole={userRole} />}
                  allowedRoles={["subed_dojo"]}
                />
              )
            }
          />
          <Route
            path="teams/:id/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<SingleTeamPage />}
                  allowedRoles={["subed_dojo", "national_association"]}
                />
              )
            }
          />
          <Route
            path="teams/new_team/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<NewTeamPage />}
                  allowedRoles={["subed_dojo"]}
                />
              )
            }
          />
          <Route
            path="events/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<EventsPage userRole={userRole} />}
                  allowedRoles={[
                    "free_dojo",
                    "subed_dojo",
                    "national_association",
                  ]}
                />
              )
            }
          />
          <Route
            path="events/new_event/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<NewEventPage userRole={userRole} />}
                  allowedRoles={["national_association"]}
                />
              )
            }
          />
          <Route
            path="categories/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<CategoriesPage userRole={userRole} />}
                  allowedRoles={["national_association"]}
                />
              )
            }
          />
          <Route
            path="categories/new_category/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<NewCategoryPage />}
                  allowedRoles={["national_association"]}
                />
              )
            }
          />
          <Route
            path="notifications_manager/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<NotificationsPage />}
                  allowedRoles={["national_association"]}
                />
              )
            }
          />
          <Route
            path="events/:id/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<EventCard userRole={userRole} />}
                  allowedRoles={[
                    "free_dojo",
                    "subed_dojo",
                    "national_association",
                  ]}
                />
              )
            }
          />
          <Route
            path="events/:id/all_registry"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<EventAllRegistryPage userRole={userRole} />}
                  allowedRoles={["subed_dojo", "national_association"]}
                />
              )
            }
          />
          <Route
            path="events/:id/draw/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<DrawPage />}
                  allowedRoles={["national_association"]}
                />
              )
            }
          />
          <Route
            path="events/:id/draw/generate/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<GenerateDrawPage />}
                  allowedRoles={["national_association"]}
                />
              )
            }
          />
          <Route
            path="events/:id/individuals/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<IndividualsPage userRole={userRole} />}
                  allowedRoles={[
                    "free_dojo",
                    "subed_dojo",
                    "national_association",
                  ]}
                />
              )
            }
          />
          <Route
            path="events/:id/teams/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<RegisteredTeamsPage />}
                  allowedRoles={[
                    "free_dojo",
                    "subed_dojo",
                    "national_association",
                  ]}
                />
              )
            }
          />
          <Route
            path="rules/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<RulesPage />}
                  allowedRoles={["free_dojo", "subed_dojo"]}
                  allowUnauthenticated
                />
              )
            }
          />
          <Route
            path="classifications/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<ClassificationsPage />}
                  allowedRoles={["free_dojo", "subed_dojo"]}
                  allowUnauthenticated
                />
              )
            }
          />
          <Route
            path="help/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<HelpPage />}
                  allowedRoles={["free_dojo", "subed_dojo"]}
                  allowUnauthenticated
                />
              )
            }
          />
          <Route
            path="results_display/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<ResultsMainPage />}
                  allowedRoles={["national_association"]}
                />
              )
            }
          />
          <Route
            path="settings/"
            element={
              isAuthLoading ? null : (
                <ProtectedRoute
                  element={<MainSettingsPage />}
                  allowedRoles={["national_association"]}
                />
              )
            }
          />
          <Route path="unauthorized/" element={<UnAuthorizedPage />} />
          <Route path="not_found/" element={<NotFoundPage />} />
        </Route>
        <Route element={<DisplayPanelLayout />}>
          <Route path="/display_panel/" element={<DisplayPage />} />
          <Route path="display_panel/kata_elim/" element={<KataElim />} />
          <Route path="display_panel/kata_final/" element={<KataFinal />} />
          <Route path="display_panel/kata_team/" element={<KataTeam />} />
          <Route path="display_panel/kumite_indiv/" element={<KumiteIndiv />} />
          <Route path="display_panel/kumite_team/" element={<KumiteTeam />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
