import React, { useEffect } from 'react';
import './views/schedule_maker/Scheduler.css'
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { gapi } from 'gapi-script';
import GoogleAuthComponentHandler from './views/auth/GoogleAuthComponentHandler';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ""

type Props = {
    profile: GoogleLoginResponse["profileObj"];
    setProfile: (newProfile: GoogleLoginResponse["profileObj"]) => void;
}

function NavBar({profile, setProfile}: Props) {

    return (
        <div className='navbar'>
            <Link to={"/"}>
                <button className='homeButton'>
                    Schedule Builder
                </button>
            </Link>
            
            <GoogleAuthComponentHandler        
                profile={profile} 
                setProfile={setProfile}        
            />

        </div>
    )
}

export default NavBar;