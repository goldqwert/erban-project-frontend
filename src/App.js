import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);
  const userNameRef = useRef(null)

  const getUsers = () => {
    axios.get('http://localhost:7543/users').then(res => {
      setUsers(res.data);
    })
  }

  useEffect(() => {
    getUsers();
  }, [])

  const createUser = (name) => {
    axios.post('http://localhost:7543/users', { name: userNameRef.current.value })
      .then(res => {
        getUsers();
      })
  }

  return (
    <>
      <input ref={userNameRef} />
      <div><button onClick={createUser}>Create new user</button></div>
      <div>{users.map(el => <div>{el.name}</div>)
      }</div>
    </>
  );
}

export default App;
