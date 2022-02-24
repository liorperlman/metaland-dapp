
import React, { useEffect, useState } from 'react';
import './App.css';
import Map from "./components/Map.js"
import PurchaseLandData from "./PurchaseLand.json"
import getWeb3 from "./hooks/getWeb3"

const contractAddress = "0xF71b8DC1C4dc5Cc0300C560cDd015669b2E784FE"
const App = () => {

  return (
    <>

      <div className="App">
        <header className="App-header">
          <p>
            MetaLand!
          </p>

          {/* {(active) ?
  <button className="main-mint-btn">Mint</button>
  : <button type="button" onClick={connect} className="main-mint-btn">Connect Wallet To Mint</button>
} */}

          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <Map />
        </header>
      </div>


    </>
  );
}

export default App;
