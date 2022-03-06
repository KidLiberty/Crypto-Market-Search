import React, { useState, useEffect } from 'react'
import './App.css'

import Coin from './Coin'

const URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'

export default function App() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        setCoins(data)
        console.log(data)
      })
      .catch(err => console.log(err))
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
        <h1 className='coin-text'>Search a Currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            placeholder='Search'
            onChange={e => handleChange(e)}
          />
        </form>
        <div className='coin-list'>
          {filteredCoins.map(coin => {
            return <Coin key={coin.id} coin={coin} />
          })}
        </div>
      </div>
    </div>
  )
}
