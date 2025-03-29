import { registerUser, logout, loginWithGoogle, loginUser } from "./auth";




export const server = {
    //actions


    //Autenticación
    registerUser,
    logout,
    loginUser,
    loginWithGoogle,
}