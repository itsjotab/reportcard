import React, { useEffect, useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { firebaseConfig } from './Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { BrowserRouter, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './Home';


const app = initializeApp(firebaseConfig);
// database from firebase
const db = getFirestore(app);
// authorization with firebase
const auth = getAuth();


// app function
function App() {
  // get username
  const [email, setEmail] = useState('');
  // get email
  const [password, setPassword] = useState('');

  const [loginFlow, setLoginFlow] = useState(true);
  // Route
  const navigate = useNavigate()

  // need to create a aysnc await
  const createUser = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCrendtials) => {
          console.log(email, password)
          const user = userCrendtials.user
          // save email to firebase
          await addDoc(collection(db, 'users'), {
            id: user.uid,
            user: user.email,
          }).catch(err => {
            console.log(err)
          })
          console.log('made it here')
          navigate('/home')
        })
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  const signIn = async () => {
    try {
      console.log(email, password)
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/home')
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  useEffect(() => {
    console.log('here we are')
  }, [])


  return (
    <div className="App">
      <form className='box'>
      <p className='header'>Welcome to the PAGE of NOTHINGNESSSSS</p>
        {/* userName input */}
        <input
          className='user'
          type='text'
          name='user'
          placeholder='Enter UserName'
          onChange={(e) => {
            setEmail(e.target.value)
            console.log(email)
          }}
        />
        {/* password */}
        <input
          className='password'
          type='password'
          placeholder='Enter Password'
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
        {/* Have to route pages to main page */}
        {/* signup button */}
        {!loginFlow && (
          <button
            disabled={!email || !password}
            value='Sign-up'
            className='btn pagelink'
            placeholder='signup'
            onClick={
              createUser
            }
          >
            Sign-Up
          </button>
        )}
        {/* signin button */}
        {loginFlow && (
          <button
            className='btn singin'
            onClick={() => signIn()}
          >
            Sign-In
          </button>
        )}
        <span onClick={() => setLoginFlow(!loginFlow)}>
          {loginFlow ? 'Create new Acount' : 'Already have an account ?'}
        </span>
      </form>
    </div>
  );
}

export default App;


