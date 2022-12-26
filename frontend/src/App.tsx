import React, { useEffect, useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import NavBar from "./NavBar";
import Orgs from "./views/Orgs";
import Degrees from "./views/Degrees";
import NewSchedule from "./views/NewSchedule";
import { UserData } from "./controllers/scheduler/types/UserData";
import Signup from "./views/auth/Signup";
import { GoogleLoginResponse } from "react-google-login";

import SessionController from "./controllers/session/SessionController";

function App() {
    const [profile, setProfile] = useState({} as UserData)

    const router = createBrowserRouter([
        {
          path: "/",
          element: 
            <div>
                <NavBar profile={profile} setProfile={(newProfile: UserData) => {setProfile(newProfile)}}/>
                <Orgs userData={profile}/>
            </div> ,
        },
        {
          path: "degrees/",
          element: 
            <div>
                <NavBar profile={profile} setProfile={(newProfile: UserData) => {setProfile(newProfile)}}/>
                <Degrees userData={profile}/>
            </div>,
        },
        {
          path: "newschedule",
          element: 
            <div>
                <NavBar profile={profile} setProfile={(newProfile: UserData) => {setProfile(newProfile)}}/>
                <NewSchedule userData={profile}/>
            </div>,
        },
        {
            path: "signup",
            element: 
            <div>
                <NavBar profile={profile} setProfile={(newProfile: UserData) => {setProfile(newProfile)}}/>
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