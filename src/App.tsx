import "./App.css";
import MainAppLayout from "./layouts/MainAppLayout";
import { DisplayPanelLayout } from "./layouts/DisplayPanelLayout";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import MembersPage from "./pages/MembersPages/MembersPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import EventCard from "./components/EventCards/EventCard";
import HomePage from "./pages/HomePage/HomePage";
import AdminHomePage from "./pages/HomePage/AdminHomePage";
import ClassificationsPage from "./pages/ClassificationsPage/ClassificationsPage";
import RulesPage from "./pages/RulesPage/RulesPage";
import HelpPage from "./pages/HelpPage/HelpPage";
import RequestAccountPage from "./pages/auth/RequestAccountPage";
import LoginPage from "./pages/auth/LoginPage";
import NewMemberPage from "./pages/MembersPages/NewMemberPage";
import SingleMemberPage from "./pages/MembersPages/SingleMemberPage";
// import TeamsPage from "./pages/TeamsPage/TeamsPage";
import IndividualsPage from "./pages/RegistrationPages/IndividualsPage";
import RegisteredTeamsPage from "./pages/TeamsPage/RegisteredTeamsPage";
import ProtectedRoute from "./access/ProtectedRoute";
import NewEventPage from "./pages/EventsPage/NewEventPage";
import NotificationManagerPage from "./pages/NotificationsPage/NotificationManagerPage";
import UnAuthorizedPage from "./pages/ErrorPages/UnAuthorizedPage";
import ServerErrorPage from "./pages/ErrorPages/ServerErrorPage";
import NotFoundPage from "./pages/ErrorPages/NotFoundPage";
import EventAllRegistryPage from "./components/EventCards/EventAllRegistryPage";
import MainSettingsPage from "./pages/SettingsPage/MainSettingsPage";
import ResultsMainPage from "./pages/ResultsMonitorPage/ResultsMainPage";
import DisplayPage from "./pages/ResultsMonitorPage/DisplayPage";
import CoachesPage from "./pages/RegistrationPages/CoachesPage";
import DrawPage from "./pages/DrawPage/DrawPage";
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
import PaymentManagerPage from "./pages/PaymentsPages/PaymentManagerPage";
import EventCategoriesPage from "./pages/EventsPage/EventCategoriesPage";
import NotificationsPage from "./pages/NotificationsPage/NotificationsPage";
import PricingPage from "./pages/InformationalPages/PricingPage";
import ScrollToTop from "./utils/scrollToTop";
import { ErrorBoundary } from "react-error-boundary";
import SingleTeamPage from "./pages/TeamsPage/SingleTeamPage";
import GenerateDrawPage from "./pages/DrawPage/GenerateDrawPage";
import DynamicViewPage from "./pages/DrawPage/DynamicViewPage";
import EventClassificationDetailsPage from "./pages/ClassificationsPage/EventClassificationDetailsPage";
import MainProfilePage from "./pages/ProfilePages/MainProfilePage";
import PageWithBackButton from "./layouts/PageWithBackButton";

function App() {
  const { user, isAuthLoading } = useAuth();
  const userRole = user?.role!;

  useEffect(() => {
    if (location.pathname.split("/").includes("display_panel")) {
      document.body.classList.add("display-mode");
    } else {
      document.body.classList.remove("display-mode");
    }
  }, [location]);

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
        <ScrollToTop>
          <ErrorBoundary FallbackComponent={ServerErrorPage}>
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
                <Route
                  path="request_account/"
                  element={<RequestAccountPage />}
                />
                <Route path="login/" element={<LoginPage />} />
                <Route
                  path="members/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <MembersPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={[
                          "subed_club",
                          "main_admin",
                          "single_admin",
                        ]}
                      />
                    )
                  }
                />
                <Route
                  path="members/:id/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <SingleMemberPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={[
                          "subed_club",
                          "main_admin",
                          "single_admin",
                        ]}
                      />
                    )
                  }
                />
                <Route
                  path="members/new_member/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={<NewMemberPage />}
                        // allowedRoles={["main_admin", "single_admin"]}
                        allowedRoles={[
                          "main_admin",
                          "single_admin",
                          "subed_club",
                        ]}
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
                        element={
                          <PageWithBackButton>
                            <SingleTeamPage />
                          </PageWithBackButton>
                        }
                        allowedRoles={["subed_club", "main_admin"]}
                      />
                    )
                  }
                />
                <Route
                  path="events/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <EventsPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={[
                          "free_club",
                          "subed_club",
                          "main_admin",
                          "technician",
                        ]}
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
                        allowedRoles={[
                          "main_admin",
                          "single_admin",
                          "subed_club",
                        ]}
                      />
                    )
                  }
                />
                <Route
                  path="events/:id/categories/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <EventCategoriesPage userRole={userRole} />
                          </PageWithBackButton>
                        }
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
                        element={
                          <PageWithBackButton>
                            <CategoriesPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={["main_admin", "single_admin"]}
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
                  path="profile/list_notifications/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <NotificationsPage me={user} />
                          </PageWithBackButton>
                        }
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
                        element={
                          <PageWithBackButton>
                            <NotificationManagerPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={["main_admin", "superuser"]}
                      />
                    )
                  }
                />
                <Route
                  path="payment_manager/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <PaymentManagerPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={["main_admin", "superuser", "subed_club"]}
                      />
                    )
                  }
                />
                <Route
                  path="events/:id/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <EventCard userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={[
                          "free_club",
                          "subed_club",
                          "main_admin",
                          "technician",
                        ]}
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
                        element={
                          <PageWithBackButton>
                            <EventAllRegistryPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={[
                          "main_admin",
                          "single_admin",
                          "subed_club",
                        ]}
                      />
                    )
                  }
                />
                <Route
                  path="events/:id/draw/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <DrawPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={[
                          "main_admin",
                          "superuser",
                          "subed_club",
                          "technician",
                        ]}
                      />
                    )
                  }
                />
                <Route
                  path="events/:id/draw/generate/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <GenerateDrawPage />
                          </PageWithBackButton>
                        }
                        allowedRoles={[
                          "main_admin",
                          "superuser",
                          "single_admin",
                        ]}
                      />
                    )
                  }
                />
                <Route
                  path="events/:id/draw/dynamic_view/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <DynamicViewPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={[
                          "main_admin",
                          "superuser",
                          "single_admin",
                          "subed_club",
                          "technician",
                        ]}
                        allowUnauthenticated
                      />
                    )
                  }
                />
                <Route
                  path="events/:id/individuals/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <IndividualsPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={["free_club", "subed_club", "main_admin"]} // keep "main_admin" for now, for debbuging effects
                      />
                    )
                  }
                />
                <Route
                  path="events/:id/coaches/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <CoachesPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={["free_club", "subed_club", "main_admin"]} // keep "main_admin" for now, for debbuging effects
                      />
                    )
                  }
                />
                <Route
                  path="events/:id/teams/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <RegisteredTeamsPage userRole={userRole} />
                          </PageWithBackButton>
                        }
                        allowedRoles={["free_club", "subed_club", "main_admin"]}
                      />
                    )
                  }
                />
                <Route
                  path="events/:id/results_display/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <ResultsMainPage />
                          </PageWithBackButton>
                        }
                        allowedRoles={["main_admin", "technician", "superuser"]}
                      />
                    )
                  }
                />
                <Route
                  path="rules/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <RulesPage />
                          </PageWithBackButton>
                        }
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
                        element={
                          <PageWithBackButton>
                            <ClassificationsPage />
                          </PageWithBackButton>
                        }
                        allowedRoles={["free_club", "subed_club"]}
                        allowUnauthenticated
                      />
                    )
                  }
                />
                <Route
                  path="classifications/:id/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <EventClassificationDetailsPage />
                          </PageWithBackButton>
                        }
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
                  path="settings/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <MainSettingsPage />
                          </PageWithBackButton>
                        }
                        allowedRoles={["main_admin"]}
                      />
                    )
                  }
                />
                <Route
                  path="profile/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={
                          <PageWithBackButton>
                            <MainProfilePage user={user}></MainProfilePage>
                          </PageWithBackButton>
                        }
                        allowedRoles={[
                          "main_admin",
                          "subed_club",
                          "superuser",
                          "single_admin",
                        ]}
                      />
                    )
                  }
                />
                <Route
                  path="pricing/"
                  element={
                    isAuthLoading ? null : (
                      <ProtectedRoute
                        element={<PricingPage />}
                        // element={<WIPPage />}
                        allowedRoles={["free_club", "subed_club"]}
                        allowUnauthenticated
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
                <Route path="display_panel/kata_elim/" element={<KataElim />} />
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
                <Route
                  path="display_panel/kumite_team/"
                  element={<KumiteTeam />}
                />
              </Route>
            </Routes>
          </ErrorBoundary>
        </ScrollToTop>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
