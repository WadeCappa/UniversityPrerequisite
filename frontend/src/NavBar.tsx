import React, { useEffect } from 'react';
import './views/schedule_maker/Scheduler.css'
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { gapi } from 'gapi-script';
import GoogleAuthComponentHandler from './views/auth/GoogleAuthComponentHandler';
import { UserData } from './controllers/scheduler/types/UserData';
import ProfileHandler from './views/auth/ProfileHandler';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ""

type Props = {
    navData: {
        profile: UserData;
        setProfile: (newProfile: UserData) => void;
    }
}

function NavBar({navData}: Props) {

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
                    profile={navData.profile} 
                    setProfile={navData.setProfile}        
                />
            </div>

        </div>
    )
}

export default NavBar;