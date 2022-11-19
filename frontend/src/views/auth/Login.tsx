import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SessionController from '../../controllers/session/SessionController';

import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ""

type Props = {
    profile: GoogleLoginResponse;
    setProfile: (newProfile: GoogleLoginResponse) => void;
}

function Login({profile, setProfile}: Props) {
    // part of the logic engine needs to manage the state of these forms (just the sending part)
    const [state, setState] = useState({email: "", password: ""})
    const navigate = useNavigate();

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const isResponseOnline = (response: GoogleLoginResponse | GoogleLoginResponseOffline): response is GoogleLoginResponse => {
        return 'profileObj' in (response as GoogleLoginResponse);
      };

    const onSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log(res)
        if (isResponseOnline(res)) {
            setProfile(res);
        }
    };

    const onFailure = (err: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile({} as GoogleLoginResponse);
    };


    return (
        <div className='header'>
            {/* <form>
                <div>
                    <label>Email:
                        <input type="text" 
                            onChange={(event) => setState({...state, email: event.target.value})}
                        />
                    </label>
                </div>
                <div>
                    <label>password:
                        <input type="password" 
                            onChange={(event) => setState({...state, password: event.target.value})}
                        />
                    </label>
                </div>
            </form>
            <button className='slot' onClick={async () => {
                // call API, if user exists return JWT, else return error 
                const jwt: string = await SessionController.login(state.email, state.password)
                console.log(jwt)

                // wait for API response
                    // if JWT 
                        // save JWT as a cookie. 
                        // Then push onto react router history the home screen
                    // else display error, do nothing else. 
            }}>
                login
            </button>
            <Link  to={"/signup"}>
                <button className='slot'>
                    Create Account?
                </button>
            </Link> */}
            <div>                
                <div>
                    <h3>{profile.profileObj.imageUrl ? "User is logged in" : "User not logged in"}</h3>
                    <p>Name: {profile.profileObj.name}</p>
                    <p>Email Address: {profile.profileObj.email}</p>
                    <br />
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />
                    <br />
                    <br/>
                    <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                </div>
            </div>

        </div>
    )
  }

export default Login;