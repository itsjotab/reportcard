import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [URL, setURL] = useState([])


  const url = 'http://localhost:5001/report-card-for-people/us-central1/helloWorld';


  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(res => setURL(res))
  }, [])


  return (
    <div className="App">
      <div>
        { URL }
      </div>
    </div>
  );
}

export default App;
