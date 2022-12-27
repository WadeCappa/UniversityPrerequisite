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
import { MakerState } from "./controllers/scheduler/types/StateConstructor";

type Props = {
  profile: UserData,
  setProfile: (newProfile: UserData) => void,
}

function App() {
    const [profile, setProfile] = useState({} as UserData)

    const navBarProps = {
      profile: profile, 
      setProfile: (newProfile: UserData) => {setProfile(newProfile)},
    } as Props

    const router = createBrowserRouter([
        {
          path: "/",
          element: 
            <div>
                <NavBar navData={navBarProps}/>
                <Orgs userData={profile}/>
            </div> ,
        },
        {
          path: "degrees/",
          element: 
            <div>
                <NavBar navData={navBarProps}/>
                <Degrees userData={profile}/>
            </div>,
        },
        {
          path: "newschedule",
          element: 
            <div>
                <NewSchedule navData={navBarProps}/>
            </div>,
        },
        {
            path: "signup",
            element: 
            <div>
                <NavBar navData={navBarProps}/>
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