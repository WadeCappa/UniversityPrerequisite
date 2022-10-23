import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Orgs from "./views/Orgs";
import Degrees from "./views/Degrees";
import ScheduleMaker from "./views/schedule_maker/ScheduleMaker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Orgs/>,
  },
  {
    path: "degrees/",
    element: <Degrees/>,
  },
  {
    path: "scheduler",
    element: <ScheduleMaker/>,
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);