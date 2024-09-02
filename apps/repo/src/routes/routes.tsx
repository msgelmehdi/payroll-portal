import { Suspense, lazy } from "react";
import { RouteObject, Outlet, Navigate } from "react-router-dom";
import { NotFoundPage, Loading } from "@repo/lib";
import { AuthProvider } from "../utils/auth.provider";
import { SharedLayout } from "../layout/SharedLayout";

const AuthApp = lazy(() => import("../modules/auth/AuthApp"));
const EmployeesApp = lazy(() => import("../modules/employees/EmployeesApp"));
const SalariesApp = lazy(() => import("../modules/salaries/SalariesApp"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <AuthProvider>
        <SharedLayout>
          <Outlet />
        </SharedLayout>
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
        <Suspense fallback={<Loading />}>
          <AuthApp />
        </Suspense>
      </AuthProvider>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
