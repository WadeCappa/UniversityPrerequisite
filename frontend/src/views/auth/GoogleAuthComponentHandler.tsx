import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { gapi } from 'gapi-script';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ""

type Props = {
    profile: GoogleLoginResponse["profileObj"];
    setProfile: (newProfile: GoogleLoginResponse["profileObj"]) => void;
}

function GoogleAuthComponentHandler({profile, setProfile}: Props) {

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

    const onSuccess = async (googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log(googleData)
        if (isResponseOnline(googleData)) {

            const backend_response = await fetch("/auth/login", {
                    method: "POST",
                    body: JSON.stringify({
                        token: googleData.tokenId
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })  
            
            const data = await backend_response.json()
            setProfile(data.profileObj);
            navigate('/')
        }
    };

    const onFailure = (err: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile({} as GoogleLoginResponse["profileObj"]);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Sign in with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )
}

export default GoogleAuthComponentHandler;