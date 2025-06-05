import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App.jsx"; // Import App as the layout component
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddLog from "./pages/AddLog.jsx";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Use App as the root layout
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-log",
        element: (
          <ProtectedRoute>
            <AddLog />
          </ProtectedRoute>
        ),
      },
      {
        // path: "/",
        index: true, // this is the default child route for "/"
        element: <Navigate to="/login" />,
      },
    ],
  },
]);

export default router;