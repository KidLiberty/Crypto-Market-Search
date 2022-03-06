import React, { useState, useEffect, useMemo } from 'react'
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
      .then(data => setCoins(data))
  }, [])

  function handleChange(e) {
    setSearch(e.target.value)
  }

  const filteredCoins = useMemo(
    () =>
      coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
      ),
    [coins, search]
  )

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a Currency</h1>
        <input
          className='coin-input'
          type='text'
          placeholder='Search'
          value={search}
          onChange={e => handleChange(e)}
        />
        <div className='coin-list'>
          {filteredCoins.map(coin => {
            return <Coin key={coin.id} coin={coin} />
          })}
        </div>
      </div>
    </div>
  )
}
