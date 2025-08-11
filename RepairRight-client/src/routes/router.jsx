import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import App from "../App";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
import ProtectedRoute from "../components/ProtectedRoute";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import { serviceLoader, servicesLoader } from "../services/dataLoaders";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";

const Home = lazy(() => import("../pages/Home"));
const Services = lazy(() => import("../pages/Services"));
const FAQs = lazy(() => import("../pages/FAQs"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const AddService = lazy(() => import("../pages/AddService/AddService"));
const ManageService = lazy(() =>
  import("../pages/ManageService/ManageService")
);
const BookedServices = lazy(() => import("../pages/BookServices"));
const ServiceToDo = lazy(() => import("../pages/ServiceToDo"));
const Profile = lazy(() => import("../pages/Profile"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const DashboardHome = lazy(() => import("../pages/Dashboard/DashboardHome"));

// eslint-disable-next-line react-refresh/only-export-components
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
      },
      {
        path: "services",
        element: (
          <SuspenseWrapper>
            <Services />
          </SuspenseWrapper>
        ),
        loader: servicesLoader,
      },
      {
        path: "faqs",
        element: (
          <SuspenseWrapper>
            <FAQs />
          </SuspenseWrapper>
        ),
      },
      {
        path: "login",
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        ),
      },
      {
        path: "register",
        element: (
          <SuspenseWrapper>
            <Register />
          </SuspenseWrapper>
        ),
      },
      // Protected Routes
      {
        path: "about",
        element: (
          <SuspenseWrapper>
            <AboutUs />
          </SuspenseWrapper>
        ),
      },
      {
        path: "add-service",
        element: <Navigate to="/dashboard/add-service" replace />,
      },
      {
        path: "services/:id",
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <ServiceDetails />
            </ProtectedRoute>
          </SuspenseWrapper>
        ),
        loader: serviceLoader,
      },
      {
        path: "manage-service",
        element: <Navigate to="/dashboard/manage-service" replace />,
      },
      {
        path: "booked-services",
        element: <Navigate to="/dashboard/booked-services" replace />,
      },
      {
        path: "service-to-do",
        element: <Navigate to="/dashboard/service-to-do" replace />,
      },
      {
        path: "profile",
        element: <Navigate to="/dashboard/profile" replace />,
      },
      // Dashboard section (protected, nested)
      {
        path: "dashboard",
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          </SuspenseWrapper>
        ),
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "add-service", element: <AddService /> },
          { path: "manage-service", element: <ManageService /> },
          { path: "booked-services", element: <BookedServices /> },
          { path: "service-to-do", element: <ServiceToDo /> },
          { path: "profile", element: <Profile /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
