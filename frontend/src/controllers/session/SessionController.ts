import DataEngine from "../apiManager/DataEngine"
import * as React from 'react';
import { GoogleLoginResponse } from "react-google-login";

export default class SessionController {
    public AuthContext = React.createContext({} as GoogleLoginResponse);

    public static async login(email: string, password: string): Promise<string> {
        return await DataEngine.GetJWT(email, password)        
    }

    public static async signin(email: string, password: string) {
        const jwt: string = await DataEngine.NewAccount(email, password)
        console.log(jwt)
        // store JWT as a cookie
    }
}