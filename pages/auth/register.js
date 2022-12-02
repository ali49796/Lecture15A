import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { database } from '../../firebase';
import {useRouter} from 'next/router'
import Link from 'next/link';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

function Register() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const router = useRouter();
  const auth = getAuth();
  
  const saveData = async (e) => {
    e.preventDefault();
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        
        // Save this user in firestore
        await setDoc(doc(database, "users", user.uid), {
          "email":email,              
        })
  
        alert('user registered successfully');
        setEmail('');
        setPassword('');
        
        }
        catch (error) {
            console.log("Something went wrong with registration: " + error);
        }
  }

  return (
      <div className='flex items-center justify-center h-screen flex-col'>
        <form className='bg-gray-400 w-4/12 flex items-center justify-center flex-col gap-4 py-5 px-10'>
          <h2 className='font-bold text-xl '>Registration</h2>
          <input 
            type="email" 
            placeholder='Enter Email' 
            className='w-full py-1 px-4 border-none outline-none' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="password" 
            placeholder='Enter Password' 
            className='w-full py-1 px-4 border-none outline-none' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            type='submit'
            className='bg-blue-500 text-white w-full p-2 rounded-full'
            onClick={saveData}
          >Insert</button>

          ALready Have an account ? 
          <Link href={"/auth/login"}>Login</Link>
        </form>

      </div>
  )
}

export default Register