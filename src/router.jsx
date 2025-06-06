import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddLog from "./pages/AddLog.jsx";
import EditLogPage from "./pages/EditLogPage.jsx"; // <-- Use the page, not the modal

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        path: "edit-log/:id",
        element: (
          <ProtectedRoute>
            <EditLogPage />
          </ProtectedRoute>
        ),
      },
      {
        index: true,
        element: <Navigate to="/login" />,
      },
    ],
  },
]);

export default router;