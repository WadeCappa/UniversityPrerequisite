import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import NavBar from "./NavBar";
import Orgs from "./views/Orgs";
import Degrees from "./views/Degrees";
import NewSchedule from "./views/NewSchedule";
import Login from "./views/auth/Login";

const router = createBrowserRouter([
    {
      path: "/",
      element: 
        <div>
            <NavBar/>
            <Orgs/>
        </div> ,
    },
    {
      path: "degrees/",
      element: 
        <div>
            <NavBar/>
            <Degrees/>
        </div>,
    },
    {
      path: "newschedule",
      element: 
        <div>
            <NavBar/>
            <NewSchedule/>
        </div>,
    },
    {
        path: "login",
        element: 
        <div>
            <NavBar/>
            <Login/>
        </div>
    }
  ]);

function App() {

    return (
        <div className="main">
            <RouterProvider router={router} />
        </div>
    )
}

export default App