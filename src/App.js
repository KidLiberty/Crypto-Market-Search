import React, { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios'

const URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

export default function App() {
  const [coins, setCoins] = useState([])

  useEffect(() => {
    axios
      .get(URL)
      .then(res => {
        setCoins(res.data)
        console.log(res.data)
      })
      .catch(error => console.log(error))

    // fetch(URL)
    //   .then(res => res.json())
    //   .then(data => {
    //     setCoins(data)
    //     console.log(data)
    //   })
  }, [])

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coint-input'
            type='text'
            placeholder='Search'
          ></input>
        </form>
      </div>
    </div>
  )
}
