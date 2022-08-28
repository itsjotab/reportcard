import React, { useEffect, useState } from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore'
import { firebaseConfig } from './Firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

function App() {
  // get username
  const [newUser, setNewUser] = useState('');
  // get email
  const [password, setPassword] = useState('');

  // need to create a aysnc await
  // save email to firebase
  const userInfo = async () => {
    try {
      await createUserWithEmailAndPassword(auth, newUser, password)
        .then((userCrendtials => {
          const user = userCrendtials.user
          console.log(user)
          if (newUser.length > 0) {
            addDoc(collection(db, 'users'), {
              id: user.uid,
              user: user.email,
            })
          }
        }))
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
      <div className='box'>
        <p className='header'>Welcome to the PAGE of NOTHINGNESSSSS</p>
        {/* userName input */}
        <input
          className='user'
          type='text'
          name='user'
          placeholder='Enter UserName'
          onChange={(e) => {
            setNewUser(e.target.value)
            console.log(newUser)
          }
          }
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
        {/* signup button */}
        <input
          type='submit'
          value='Sign-up'
          className='btn pagelink'
          placeholder='signup'
          onClick={() => userInfo()}
        />
        {/* signin button */}
        <input
          className='btn singin'
          type='submit'
          value='Signin'
        // onClick={() => go to signin page }
        />
      </div>
    </div>
  );
}

export default App;



//auth.CreateUserWithEmailAndPasswordAsync(email, password)
