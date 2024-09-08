import { Suspense, lazy } from "react";
import { RouteObject, Outlet, Navigate } from "react-router-dom";
import { NotFoundPage, Loading } from "@repo/lib";
import { AuthProvider } from "../utils/auth.provider";
import { SharedLayout } from "../layout/SharedLayout";
import { ThemeProvider } from "../utils/theme.provider";

const AuthApp = lazy(() => import("../modules/auth/AuthApp"));
const EmployeesApp = lazy(() => import("../modules/employees/EmployeesApp"));
const SalariesApp = lazy(() => import("../modules/salaries/SalariesApp"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <ThemeProvider>
          <SharedLayout>
            <Outlet />
          </SharedLayout>
        </ThemeProvider>
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={"/employees"} />,
      },
      {
        path: `/employees/*`,
        element: (
          <Suspense fallback={<Loading />}>
            <EmployeesApp />
          </Suspense>
        ),
      },
      {
        path: `/salaries/*`,
        element: (
          <Suspense fallback={<Loading />}>
            <SalariesApp />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: `/auth/*`,
    element: (
      <AuthProvider>
        <ThemeProvider>
          <Suspense fallback={<Loading />}>
            <AuthApp />
          </Suspense>
        </ThemeProvider>
      </AuthProvider>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
