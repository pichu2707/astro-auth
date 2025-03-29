import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { firebase } from '../../firebase/config';

export const loginWithGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async ( credentials ) => {
        // Handle login with Google logic here
        const credential = GoogleAuthProvider.credentialFromResult(credentials);

        if ( !credential ) {
            throw new Error('No se ha podido obtener el token de Google');
        }

        await signInWithCredential( firebase.auth, credential );
        
        return {ok: true };
    }
});