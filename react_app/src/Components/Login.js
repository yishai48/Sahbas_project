// Login component

import React, { useState } from 'react';
import './Login.css';
import usetoken from '../utils/usetoken';


async function loginUser(credentials) {
  await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(response => {
    response.json()
      .then(responseJson => {
        usetoken().saveToken(responseJson)
        if (response.status === 401) {
          alert("username or password is incorrect!")
        }
        if (response.status === 200) {
          window.location.assign("./Bitcoin");
        }
      });
  })
}
//Login function
export default function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    if(username.includes("'")||username.includes("\"") || username==""|| username==undefined)
    {
      alert("invalid user name ");
      return;
    }
    if( password==""|| password==undefined)
    {
      alert("invalid password ");
      return;
    }
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
  }
  return (
    <div className="wrapper fadeInDown">
  <div id="formContent">



    <form onSubmit={handleSubmit}> 
      <input type="text" id="login" className="fadeIn second" name="login" onChange={e => setUserName(e.target.value)} placeholder="login"/>
      <input type="password" id="password" className="fadeIn third" name="login" onChange={e => setPassword(e.target.value)} placeholder="password"/>
      <input type="submit" className="fadeIn fourth" value="Log In"/>
    </form>
    <div id="formFooter">
      <a className="underlineHover" href="../">To Sign Up</a>
    </div>

  </div>
</div>

  )
}
   