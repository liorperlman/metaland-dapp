import logo from './logo.svg';
import './App.css';
import React, { Component }  from 'react';
import { useWeb3React } from "@web3-react/core";
import { injected } from "./wallet/Connector";
import web3 from "web3";

const App = () => {
  const { active, account, library, activate,deactivate } = useWeb3React()
  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(account)
    }
  }
  return (
    <>

<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         MetaLand!

        </p>

        {(active) ?
  <button className="main-mint-btn">Mint</button>
  : <button type="button" onClick={connect} className="main-mint-btn">Connect Wallet To Mint</button>
}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    
    </>
  );
}

export default App;
