//Esto solo funciona de manera local, no es recomendable usarlo en producción


import { defineMiddleware } from "astro:middleware";
import { firebase } from "./firebase/config";


const privateRoutes = ["/protected"];
const notAuthenticateRoutes = ["/login", "/register"];

export const onRequest = defineMiddleware(async ({ url, request, locals, redirect}, next) => {


// const authHeaders = request.headers.get('authorization') ?? '';
// if ( privateRoutes.includes(url.pathname )) {
    // return checkLocalAuth(authHeaders, next);
    
    const isLoggedId = !!firebase.auth.currentUser;
    const user = firebase.auth.currentUser
    
    if (user) {
        locals.user = {
            email: user.email!,
            name: user.displayName!,
            avatar: user.photoURL ?? '',
            emailVerified: user.emailVerified,
        }
    }
    
    
    if ( !isLoggedId && privateRoutes.includes(url.pathname) ) {
        return redirect('/');
    }

    if ( isLoggedId && notAuthenticateRoutes.includes(url.pathname) ) {
            return redirect('/');
        }


    return next();
});

// const checkLocalAuth = async ( authHeaders: string, next: MiddlewareNext ) => {
//     if ( authHeaders ) {

//         const authVale = authHeaders.split(' ').at(-1) ?? 'user:password';
//         const decodedValue = atob(authVale).split(':');
//         const [user, password] = decodedValue;
    
//         if ( user === 'admin' && password === 'admin' ) {
//             return next();
//         }
//         console.log("decodedValue", decodedValue);
//     }
//         return new Response('Auth Necesaria', {
//             status: 401,
//             statusText: 'Unauthorized',
//             headers: {
//                 'WWW-Authenticate': 'Basic realm="Secure Area"'
//             },
//         });

//     };
