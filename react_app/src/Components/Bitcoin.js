import React from 'react';
import { useState, useEffect,Link } from "react"
import './Bitcoin.css'
import usetoken from '../utils/usetoken';
//Bitcoin Api
function Bitcoin() {
  const [coins, setCoins] = useState([])
  const [limit, setLimit] = useState(20)

  
  useEffect(() => {
    
    const fetchCoins = async () => {
      const res = await fetch(`https://api.coincap.io/v2/assets`)
      const data = await res.json()
      console.log(data.data)
      setCoins(data.data)
    }

    fetchCoins()
  }, [limit])
  const token = usetoken().getToken();
        if (!token) {
            window.location.replace("/Login")

            return;
        }
    

 const  logout = () => {
    window.localStorage.removeItem("token");
    window.location.assign("../Login")
}
   
  const handleRefresh = () => {
    setLimit(20)
    window.scrollTo(0, 0)
  }

  return (
       <section className="coins">
         <button onClick={logout} className="btn btn-outline-info">Press To Logout</button>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" ,color: "#92badd"}}>
         CoinCap API
      </h1>
      <article>
        <p>Showing {coins.length} coins</p>
      </article>
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Price (USD)</th>
            <th>changePercent24Hr</th>
            <th>supply</th>
          </tr>
        </thead>

        <tbody>
          {coins.map(({ id, name, rank, priceUsd,changePercent24Hr,supply }) => (
            <tr key={id}>
              <td>{rank}</td>
              <td>{name}</td>
              <td>${parseFloat(priceUsd).toFixed(2)}</td>
              <td>${parseFloat(changePercent24Hr).toFixed(2)}</td>
              <td>${parseFloat(supply).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons">
        <button className='btn btn-outline-dark' onClick={handleRefresh}>Refresh</button>
      </div>
    </section>
  );
}

export default Bitcoin;
