import React from 'react';
import './views/schedule_maker/Scheduler.css'
import { Link } from 'react-router-dom';
import { GoogleLoginResponse } from "react-google-login";

type Props = {
    profile: GoogleLoginResponse["profileObj"];
}

function NavBar({profile}: Props) {
    return (
        <div className='navbar'>
            <Link to={"/"}>
                <button className='homeButton'>
                    Schedule Builder
                </button>
            </Link>
            
            <Link to={"/login"}>
                <button className='slot'>
                    login
                </button>
            </Link>
        </div>
    )
}

export default NavBar;