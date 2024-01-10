import {createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { FirebaseAuth } from './config';


export const registerUserWithEmailPassword = async ({displayName, email, password }) =>{

    try {
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password )
        const { uid, photoURL} = resp.user
        
        await updateProfile (FirebaseAuth.currentUser, {displayName})

        console.log(resp);
        
    } catch (error) {
        console.log(error); 
        return { ok: false, errorMessage:error.message}
        
    }

}