import React, { useEffect, useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { firebaseConfig } from './Firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
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
  // login or create account
  const [loginFlow, setLoginFlow] = useState(true);
  // Route
  const navigate = useNavigate()


  // need to create a aysnc await
  const createUser = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCrendtials) => {
          const user = userCrendtials.user
          // save email to firebase
          await addDoc(collection(db, 'users'), {
            id: user.uid,
            user: user.email,
          })
          navigate('/home')
        }).catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/home')
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }



  return (
    <div className="App">
      <div className='box'>
        <p className='header'>Welcome to the PAGE of NOTHINGNESSSSS</p>
        {/* userName input */}
        <input
          className='user'
          type='text'
          name='user'
          placeholder='Enter UserName'
          onChange={(e) => {
            setEmail(e.target.value)
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
            onClick={() => {
              createUser()
            }
            }
          >
            Sign-Up
          </button>
        )}
        {/* signin button */}
        {loginFlow && (
          <button
            className='btn singin'
            onClick={() => {
              signIn()
            }}
          >
            Sign-In
          </button>
        )}
        <span onClick={() => setLoginFlow(!loginFlow)}>
          {loginFlow ? 'Create new Acount' : 'Already have an account ?'}
        </span>
      </div>
    </div>
  );
}

export default App;