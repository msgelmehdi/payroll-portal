import { Navigate, Outlet } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import SignInPage from "../pages/SignInPage";
import { NotFoundPage } from "@repo/lib";

export const AuthRoutes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/sign-in" replace />,
      },
      {
        path: `sign-in`,
        element: <SignInPage />,
      },
      {
        path: `sign-up`,
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
