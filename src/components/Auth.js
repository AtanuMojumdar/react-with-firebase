import React, { useState } from 'react'
import {auth, googleProvider} from '../config/firebase'
import {createUserWithEmailAndPassword, signInWithPopup,signOut} from 'firebase/auth'

const Auth = () => {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')

    //  console.log(auth?.currentUser?.uid)

     const signin=async()=>{
        try{

            await createUserWithEmailAndPassword(auth,email,password)
        }
        catch(err){
            console.error(err)
        }
     }

     const signInWithGoogle=async()=>{
        try{

            await signInWithPopup(auth,googleProvider)
        }
        catch(err){
            console.error(err)
        }
     }

     const logOut=async()=>{
        try{

            await signOut(auth)
        }
        catch(err){
            console.error(err)
        }
     }


  return (
    <div>
        <input type="text" placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} />
        <button onClick={signin}>Sign In</button>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        <button onClick={logOut}>Sign out</button>
    </div>
  )
}

export default Auth