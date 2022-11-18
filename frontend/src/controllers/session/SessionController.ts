import DataEngine from "../apiManager/DataEngine"

export default class SessionController {
    public static async login(email: string, password: string) {
        const jwt: string = await DataEngine.GetJWT(email, password)
        console.log(jwt)
        // store JWT as a cookie
    }

    public static async signin(email: string, password: string) {
        const jwt: string = await DataEngine.NewAccount(email, password)
        console.log(jwt)
        // store JWT as a cookie
    }
}