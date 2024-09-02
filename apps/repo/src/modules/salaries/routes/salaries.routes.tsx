import { Outlet } from "react-router-dom";
import SalariesPage from "../pages/SalariesPage";
import SalariesProcessingPage from "../pages/SalariesProcessingPage";
import { NotFoundPage } from "@repo/lib";

export const SalariesRoutes = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <SalariesPage />,
      },
      {
        path: ":employeeId",
        element: <SalariesProcessingPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
