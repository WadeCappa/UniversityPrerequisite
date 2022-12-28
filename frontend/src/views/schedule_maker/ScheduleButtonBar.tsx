import React, { MouseEventHandler, useEffect } from 'react';
import './Scheduler.css'
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { gapi } from 'gapi-script';
import GoogleAuthComponentHandler from './../auth/GoogleAuthComponentHandler';
import { UserData } from './../../controllers/scheduler/types/UserData';
import ProfileHandler from './../auth/ProfileHandler';
import { MakerState } from '../../controllers/scheduler/types/StateConstructor';
import Scheduler from '../../controllers/scheduler/Scheduler';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ""

type Props = {
    state: MakerState,
    navData: {
        profile: UserData;
        setProfile: (newProfile: UserData) => void;
    }
}

function ScheduleButtonBar({navData, state}: Props) {

    return (
        <div className='navbar'>
            <div className='taskLeft'>
                <Link to={"/"}>
                    <button className='homeButton'>
                        Schedule Builder
                    </button>

                    <button className="slot" onClick={async (e) => {
                        e.preventDefault();
                        await Scheduler.saveSchedule(state, navData.profile.jwt);
                    }}>
                        Save
                    </button>
                    
                    <button className="slot" onClick={(e) => {e.preventDefault()}}>Load Previous Schedule</button>
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

export default ScheduleButtonBar;