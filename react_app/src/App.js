import React from 'react';
import './App.css';
import Login from './Components/Login'
import Signup from'./Components/Signup'
import { BrowserRouter, Route, Switch   } from 'react-router-dom';
import Bitcoin from './Components/Bitcoin';
import usetoken from './utils/usetoken';
 const privetRout=()=>{
    const token = usetoken().getToken();
    console.log("yes");
    if (!token) {
      console.log("no");
        window.location.replace("/Login")
        return;
    }
  }
function App() {
 
  return (
    <div className="wrapper">
    <BrowserRouter>
        <Switch>
          <Route path="/"  exact component={Signup}/> 
          <Route path="/Login"  exact component={Login}/> 
          <Route path="/Bitcoin"   exact component={Bitcoin} />
        </Switch>
      </BrowserRouter> 
      </div>
  );
}

export default App;
