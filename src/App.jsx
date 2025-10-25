import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DashboardOverview from "./pages/DashboardOverview";
import Ticket from "./pages/Ticket";
import HomeLayout from "./pages/HomeLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "sign-up",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          {" "}
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <DashboardOverview />,
        },
        {
          path: "tickets",
          element: <Ticket />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
