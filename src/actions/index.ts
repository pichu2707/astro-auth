import { registerUser, logout, loginWithGoogle } from "./auth";
import { loginUser } from "./auth/login.actions";



export const server = {
    //actions


    //Autenticación
    registerUser,
    logout,
    loginUser,
    loginWithGoogle,
}