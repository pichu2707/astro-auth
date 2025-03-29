//Esto solo funciona de manera local, no es recomendable usarlo en producción

import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";


const privateRoutes = ["/protected"];

export const onRequest = defineMiddleware(async ({ url, request }, next) => {
    const authHeaders = request.headers.get('authorization') ?? '';
    if ( privateRoutes.includes(url.pathname)) {
        return checkLocalAuth(authHeaders, next);
}

    return next();
});

const checkLocalAuth = async ( authHeaders: string, next: MiddlewareNext ) => {
    if ( authHeaders ) {

        const authVale = authHeaders.split(' ').at(-1) ?? 'user:password';
        const decodedValue = atob(authVale).split(':');
        const [user, password] = decodedValue;
    
        if ( user === 'admin' && password === 'admin' ) {
            return next();
        }
        console.log("decodedValue", decodedValue);
    }
        return new Response('Auth Necesaria', {
            status: 401,
            statusText: 'Unauthorized',
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"'
            },
        });

    };

