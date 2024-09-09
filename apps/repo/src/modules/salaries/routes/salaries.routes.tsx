import { Outlet } from "react-router-dom";
import SalariesPage from "../pages/SalariesPage";
import SalariesProcessingPage from "../pages/SalariesProcessingPage";
import { NotFoundPage } from "@repo/lib";
import SalariesPaymentsPage from "../pages/SalariesPaymentsPage";

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
        path: "processing",
        element: <SalariesProcessingPage />,
      },
      {
        path: "payments",
        element: <SalariesPaymentsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
