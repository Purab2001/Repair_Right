import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import App from "../App";
import LoadingSpinner from "../ui/LoadingSpinner";
import Error from "../ui/Error";
import ProtectedRoute from "../components/ProtectedRoute";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import { serviceLoader, servicesLoader } from "../services/dataLoaders";

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
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <AddService />
            </ProtectedRoute>
          </SuspenseWrapper>
        ),
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
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <ManageService />
            </ProtectedRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: "booked-services",
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <BookedServices />
            </ProtectedRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: "service-to-do",
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <ServiceToDo />
            </ProtectedRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: "/profile",
        element: (
          <SuspenseWrapper>
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error />
  },
]);

export default router;
