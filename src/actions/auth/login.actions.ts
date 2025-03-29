import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { signInWithEmailAndPassword, type AuthError } from 'firebase/auth';
import { firebase } from '../../firebase/config';

export const loginUser = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),
    handler: async ({password, email, remember_me}, {cookies}) => {
        console.log({password, email, remember_me});

        //Cookies
        if ( remember_me ) {
            cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
                path: '/',
            });
        } else {
            cookies.delete('email',
                { path: '/' });
        }
    
    try {

        const user = await signInWithEmailAndPassword(
            firebase.auth, 
            email, 
            password
        );

        return {
            ok: true,
            uid: user.user.uid,
            email: user.user.email,
            displayName: user.user.displayName,
        };

    } catch (error) {
        const firebaseError = error as AuthError;
        // Manejo de errores específico de Firebase
        if ( firebaseError.code === 'auth/email-already-in-use' ) {
            throw new Error('Error al iniciar sesión, el correo está en uso');
        }
        console.error('Error al iniciar sesión:', error);
        throw new Error('Error al iniciar sesión');
        }
    },
});