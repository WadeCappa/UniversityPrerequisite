import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from "react-google-login";
import { gapi } from 'gapi-script';
import DataEngine from '../../controllers/apiManager/DataEngine';
import Cookies from 'universal-cookie';
import { UserData } from '../../controllers/scheduler/types/UserData';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID ? process.env.REACT_APP_GOOGLE_CLIENT_ID : ""

type Props = {
    profile: UserData;
    setProfile: (newProfile: UserData) => void;
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
        if (isResponseOnline(googleData)) {
            const new_jwt = await (await DataEngine.Login(googleData.tokenId)).json()   
            setProfile({
                jwt: new_jwt,
                imageUrl: googleData.profileObj.imageUrl,
                email: googleData.profileObj.email,
                name: googleData.profileObj.name,
                givenName: googleData.profileObj.givenName,
                familyName: googleData.profileObj.familyName,
            } as UserData);
            document.cookie = `token=${new_jwt}`
            console.log(new_jwt)
            navigate('/')
        }
    };

    const onFailure = (err: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log('failed', err);
    };

    const logOut = () => {
        setProfile({} as UserData);
    };

    if (Object.keys(profile).length === 0)
    {
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
    else 
    {
        return (
            <GoogleLogout 
                clientId={clientId} 
                buttonText="Log out" 
                onLogoutSuccess={logOut} 
            />
        )
    }


}

export default GoogleAuthComponentHandler;