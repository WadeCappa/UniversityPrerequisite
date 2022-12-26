import React, { useEffect } from 'react';
import './views/schedule_maker/Scheduler.css'
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { gapi } from 'gapi-script';
import GoogleAuthComponentHandler from './views/auth/GoogleAuthComponentHandler';
import { UserData } from './controllers/scheduler/types/UserData';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ""

type Props = {
    profile: UserData;
    setProfile: (newProfile: UserData) => void;
}

function NavBar({profile, setProfile}: Props) {

    return (
        <div className='navbar'>
            <div className='taskLeft'>
                <Link to={"/"}>
                    <button className='homeButton'>
                        Schedule Builder
                    </button>
                </Link>
            </div>
            
            <div className='taskRight' style={{marginRight:'20px'}}>
                <GoogleAuthComponentHandler       
                    profile={profile} 
                    setProfile={setProfile}        
                />
            </div>

        </div>
    )
}

export default NavBar;