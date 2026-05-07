import SignInPage from "@/pages/Auth/SignInPage";
import SignUpPage from "@/pages/Auth/SignUpPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);
