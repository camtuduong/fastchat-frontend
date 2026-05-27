import { createBrowserRouter, Navigate } from "react-router-dom";
import SignInPage from "@/pages/Auth/SignInPage";
import SignUpPage from "@/pages/Auth/SignUpPage";
import ProtectedRoute from "@/pages/Auth/ProtectedRoute";
import HomePage from "@/pages/Home/HomePage";

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [{ path: "/", element: <HomePage /> }],
  },
  { path: "/signin", element: <SignInPage /> },
  { path: "/signup", element: <SignUpPage /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);
