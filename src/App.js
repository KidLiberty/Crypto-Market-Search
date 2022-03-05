import React, { useState, useEffect } from 'react'
import './App.css'

import axios from 'axios'
import Coin from './Coin'

const URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

export default function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState()

  useEffect(() => {
    axios
      .get(URL)
      .then(res => {
        setCoins(res.data)
        console.log(res.data)
      })
      .catch(error => console.log(error))
  }, [])

  function handleChange(e) {
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coint-input'
            type='text'
            placeholder='Search'
            onChange={e => handleChange(e)}
          ></input>
        </form>
        <div>
          {filteredCoins.map(coin => {
            return <Coin key={coin.id} coin={coin} />
          })}
        </div>
      </div>
    </div>
  )
}
