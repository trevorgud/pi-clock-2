import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <h1>React + Express Demo</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
