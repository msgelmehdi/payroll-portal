import { Outlet } from "react-router-dom";
import EmployeesPage from "../pages/EmployeesPage";
import { NotFoundPage } from "@repo/lib";

export const EmployeesRoutes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <EmployeesPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
