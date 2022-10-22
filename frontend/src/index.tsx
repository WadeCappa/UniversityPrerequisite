import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ScheduleMaker from "./scheduler/view/scheduleMaker";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Orgs page</h1>
        <Link to="scheduler">About Us</Link>
      </div>
    ),
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