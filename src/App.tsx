import "./App.css";
import MainAppLayout from "./layouts/MainAppLayout";
import { DisplayPanelLayout } from "./layouts/DisplayPanelLayout";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import AthletesPage from "./pages/AthletesPage/AthletesPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import EventCard from "./components/EventCards/EventCard";
import HomePage from "./pages/HomePage/HomePage";
import AdminHomePage from "./pages/HomePage/AdminHomePage";
import ClassificationsPage from "./pages/ClassificationsPage/ClassificationsPage";
import RulesPage from "./pages/RulesPage/RulesPage";
import HelpPage from "./pages/HelpPage/HelpPage";
import RequestAccountPage from "./pages/auth/RequestAccountPage";
import LoginPage from "./pages/auth/LoginPage";
import NewAthletePage from "./pages/AthletesPage/NewAthletePage";
import SingleAthletePage from "./pages/AthletesPage/SingleAthletePage";
// import TeamsPage from "./pages/TeamsPage/TeamsPage";
// import SingleTeamPage from "./pages/TeamsPage/SingleTeamPage";
// import NewTeamPage from "./pages/TeamsPage/NewTeamPage";
import IndividualsPage from "./pages/IndividualsPage/IndividualsPage";
import RegisteredTeamsPage from "./pages/TeamsPage/RegisteredTeamsPage";
import ProtectedRoute from "./access/ProtectedRoute";
import NewEventPage from "./pages/EventsPage/NewEventPage";
import NotificationManagerPage from "./pages/NotificationsPage/NotificationManagerPage";
import UnAuthorizedPage from "./pages/ErrorPages/UnAuthorizedPage";
// import ServerErrorPage from "./pages/ErrorPages/ServerErrorPage";
import NotFoundPage from "./pages/ErrorPages/NotFoundPage";
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
import KumiteIndiv from "./pages/DisplayPanelPages/KumiteIndiv";
import KumiteTeam from "./pages/DisplayPanelPages/KumiteTeam";
import SignUpWithTokenPage from "./pages/auth/SignUpWithTokenPage";
import PasswordResetPage from "./pages/auth/PasswordResetPage";
import { useEffect } from "react";
import { useAuth } from "./access/GlobalAuthProvider";
import { SnackbarProvider } from "notistack";
import WIPPage from "./pages/ErrorPages/WIPPage";
// import SnackbarCloser from "./dashboard/SnackBarCloser";
import EventCategoriesPage from "./pages/EventsPage/EventCategoriesPage";

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

  const SignupWrapper = () => {
    const { token } = useParams();
    if (token) {
      return <SignUpWithTokenPage token={token} />;
    } else return <NotFoundPage />;
  };

  return (
    <SnackbarProvider>
      <BrowserRouter>
        {/* <SnackbarCloser /> */}
        <Routes>
          <Route element={<MainAppLayout me={user} />}>
            <Route
              path="/"
              element={
                ["main_admin", "single_admin"].includes(userRole) ? (
                  <AdminHomePage userRole={userRole} />
                ) : (
                  <HomePage userRole={userRole} />
                )
              }
            />
            <Route path="signup/:token/" element={<SignupWrapper />} />
            <Route path="request_account/" element={<RequestAccountPage />} />
            <Route path="login/" element={<LoginPage />} />
            <Route
              path="athletes/"
              element={
                isAuthLoading ? null : (
                  <ProtectedRoute
                    element={<AthletesPage userRole={userRole} />}
                    allowedRoles={["subed_club", "main_admin", "single_admin"]}
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
                    allowedRoles={["subed_club", "main_admin", "single_admin"]}
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
                    // allowedRoles={["main_admin", "single_admin"]}
                    allowedRoles={["main_admin", "single_admin", "subed_club"]}
                  />
                )
              }
            />
            <Route
              path="teams/"
              element={
                isAuthLoading ? null : (
                  <ProtectedRoute
                    element={<WIPPage></WIPPage>}
                    // element={<TeamsPage userRole={userRole} />}
                    allowedRoles={["subed_club"]}
                  />
                )
              }
            />
            <Route
              path="teams/:id/"
              element={
                isAuthLoading ? null : (
                  <ProtectedRoute
                    element={<WIPPage></WIPPage>}
                    // element={<SingleTeamPage />}
                    allowedRoles={["subed_club", "main_admin"]}
                  />
                )
              }
            />
            <Route
              path="teams/new_team/"
              element={
                isAuthLoading ? null : (
                  <ProtectedRoute
                    element={<WIPPage></WIPPage>}
                    // element={<NewTeamPage />}
                    allowedRoles={["subed_club"]}
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
                    allowedRoles={["free_club", "subed_club", "main_admin"]}
                    allowUnauthenticated
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
                    allowedRoles={["main_admin"]}
                  />
                )
              }
            />
            <Route
              path="events/:id/categories/"
              element={
                isAuthLoading ? null : (
                  <ProtectedRoute
                    element={<EventCategoriesPage userRole={userRole} />}
                    allowedRoles={["main_admin", "subed_club"]}
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
                    allowedRoles={["main_admin"]}
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
                    allowedRoles={["main_admin"]}
                  />
                )
              }
            />
            <Route
              path="list_notifications/"
              element={
                isAuthLoading ? null : (
                  <ProtectedRoute
                    element={<WIPPage />}
                    allowedRoles={["main_admin", "subed_club"]}
                  />
                )
              }
            />
            <Route
              path="notifications_manager/"
              element={
                isAuthLoading ? null : (
                  <ProtectedRoute
                    element={<NotificationManagerPage />}
                    allowedRoles={["main_admin"]}
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
                    allowedRoles={["free_club", "subed_club", "main_admin"]}
                    allowUnauthenticated
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
                    allowedRoles={["main_admin"]} // not allow dojos for now
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
                    allowedRoles={["main_admin"]}
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
                    allowedRoles={["main_admin"]}
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
                    allowedRoles={["free_club", "subed_club", "main_admin"]}
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
                    allowedRoles={["free_club", "subed_club", "main_admin"]}
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
                    allowedRoles={["free_club", "subed_club"]}
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
                    allowedRoles={["free_club", "subed_club"]}
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
                    allowedRoles={["free_club", "subed_club"]}
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
                    allowedRoles={["main_admin", "technician"]}
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
                    allowedRoles={["main_admin"]}
                  />
                )
              }
            />
            <Route
              path="news/"
              element={
                isAuthLoading ? null : (
                  <ProtectedRoute
                    element={<WIPPage />}
                    allowedRoles={["free_club", "subed_club", "main_admin"]}
                    allowUnauthenticated
                  />
                )
              }
            />
            <Route
              path="feedback/"
              element={
                isAuthLoading ? null : (
                  <ProtectedRoute
                    element={<WIPPage />}
                    allowedRoles={["free_club", "subed_club", "main_admin"]}
                    allowUnauthenticated
                  />
                )
              }
            />
            <Route
              path="contacts/"
              element={
                isAuthLoading ? null : (
                  <ProtectedRoute
                    element={<WIPPage />}
                    allowedRoles={["free_club", "subed_club", "main_admin"]}
                    allowUnauthenticated
                  />
                )
              }
            />
            <Route
              path="reset/:uidb64/:token"
              element={<PasswordResetPage />}
            />
            <Route path="unauthorized/" element={<UnAuthorizedPage />} />
            <Route path="not_found/" element={<NotFoundPage />} />
          </Route>
          <Route element={<DisplayPanelLayout />}>
            <Route path="/display_panel/" element={<DisplayPage />} />
            <Route
              path="display_panel/kata_elim/"
              element={<KataElim match="Kata" />}
            />
            <Route
              path="display_panel/kata_final/"
              element={<KataFinal matchType="final" />}
            />
            <Route
              path="display_panel/kata_team/"
              element={<KataFinal matchType="team" />}
            />
            <Route
              path="display_panel/kumite_indiv/"
              element={<KumiteIndiv />}
            />
            <Route path="display_panel/kumite_team/" element={<KumiteTeam />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
