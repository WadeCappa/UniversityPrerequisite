import React, { useEffect, useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import NavBar from "./NavBar";
import Orgs from "./views/Orgs";
import Degrees from "./views/Degrees";
import NewSchedule from "./views/NewSchedule";
import Login from "./views/auth/Login";
import Signup from "./views/auth/Signup";
import { GoogleLoginResponse } from "react-google-login";

import SessionController from "./controllers/session/SessionController";


function App() {
    const [profile, setProfile] = useState({} as GoogleLoginResponse["profileObj"])

    const router = createBrowserRouter([
        {
          path: "/",
          element: 
            <div>
                <NavBar profile={profile} setProfile={(newProfile: GoogleLoginResponse["profileObj"]) => {setProfile(newProfile)}}/>
                <Orgs/>
            </div> ,
        },
        {
          path: "degrees/",
          element: 
            <div>
                <NavBar profile={profile} setProfile={(newProfile: GoogleLoginResponse["profileObj"]) => {setProfile(newProfile)}}/>
                <Degrees/>
            </div>,
        },
        {
          path: "newschedule",
          element: 
            <div>
                <NavBar profile={profile} setProfile={(newProfile: GoogleLoginResponse["profileObj"]) => {setProfile(newProfile)}}/>
                <NewSchedule/>
            </div>,
        },
        {
            path: "signup",
            element: 
            <div>
                <NavBar profile={profile} setProfile={(newProfile: GoogleLoginResponse["profileObj"]) => {setProfile(newProfile)}}/>
                <Signup/>
            </div>
        }
      ]);

    return (
        <div className="main">
            <RouterProvider router={router} />
        </div>
    )
}

export default App