import React from 'react';
import { useNavigate } from 'react-router-dom';
import App from './App';




function Home() {
    const navigate = useNavigate()



    
    return (
        <div>
            <button onClick={() => {
                navigate('/')
            }}>
                press me
            </button>
        </div>
    )
}

export default Home; 