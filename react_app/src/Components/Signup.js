// Signup component
import React, { useState } from 'react';
import './Login.css';

async function SignupUser(credentials) {
  await fetch('http://localhost:8080/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(response => {
      if (response.status === 409) {
        alert("the user is already exist")
      }
      if (response.status === 401) {
        alert("username or password is incorrect!")
      }
      if (response.status === 200) {
        window.location.assign("./Login")
      }
    })

}

//Signup function
export default function Signup() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState();

  const onSubmit = async e => {
    e.preventDefault();
    const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(username.includes("'")||username.includes("\"") || username=="")
    {
      alert("invalid user name ");
      return;
    }
    let isvalid = regex_email.test(email)
    if (!isvalid) {
      alert("invalid email ")
      return;
    }
    if (username.length < 3 || username.length > 20) {
      alert("username need be least 3 charcters")
      return;
    }
    if (password.length < 8 || password.length > 16) {
      alert("the password need to be least 8 digits")
      return;
    }

    else {
      const token = await SignupUser({
        username,
        email,
        password
      });
      setEmail("")
      setPassword("")
      setUserName("")
    }

  }



  return (
    <div className="wrapper fadeInDown">
  <div id="formContent">



    <form onSubmit={onSubmit}> 
      <input type="text" id="login" className="fadeIn second" name="login" onChange={e => setUserName(e.target.value)} placeholder="user name"/>
      <input type="text" id="login" className="fadeIn second" name="login"    onChange={e => setEmail(e.target.value)} placeholder="email"/>
      <input type="password" id="password" className="fadeIn third" name="login" onChange={e => setPassword(e.target.value)} placeholder="password"/>
      <input type="submit" className="fadeIn fourth" value="Sign Up"/>
    </form>
    <div id="formFooter">
      <a className="underlineHover" href="./Login">To Login</a>
    </div>

  </div>
</div>
  )
}
