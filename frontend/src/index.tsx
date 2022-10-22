import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Orgs from "./views/orgs";
import ScheduleMaker from "./views/schedule_maker/scheduleMaker";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Orgs/>,
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