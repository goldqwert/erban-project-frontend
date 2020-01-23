import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);
  const userNameRef = useRef(null)

  const getUsers = () => {
    axios.get('http://localhost:7434/users' + window.location.search).then(res => {
      setUsers(res.data);
    })
  }

  useEffect(() => {
    getUsers();
  }, [])

  const createUser = (name) => {
    axios.post('http://localhost:7434/users', { name: userNameRef.current.value })
      .then(res => {
        getUsers();
      })
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:7434/users/${id}`)
      .then(res => {
        getUsers();
      })
  }

  const updateUser = (id, name) => {
    axios.put('http://localhost:7434/users', { name, id })
      .then(res => {
        getUsers();
      })
  }

  return (
    <>
      <input ref={userNameRef} />
      <div><button onClick={createUser}>Create new user</button></div>
      <div>{users.map(el => <div><input onBlur={(e) => { updateUser(el._id, e.currentTarget.value) }} defaultValue={el.name} /><button onClick={() => deleteUser(el._id)}>X</button></div>)
      }</div>
    </>
  );
}

export default App;
