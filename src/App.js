
import React, { useEffect, useState } from 'react';
import './App.css';
import Map from "./components/Map.js"
import web3 from "web3";
import PurchaseLandData from "./PurchaseLand.json"
import getWeb3 from "./hooks/getWeb3"


const contractAddress = "0x1fcfCAB6F7E73Fdd59377aF806B46581d811ec89"
const App = () => {
  const [accountId, setAccountId] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const networkId = await web3.net.getId();
        const deployedNetwork = PurchaseLandData.networks[5777];
        const web3 = await getWeb3()
        const accounts = await web3.eth.getAccounts();
        
        let contract =  new web3.eth.Contract(
          PurchaseLandData.abi,
          deployedNetwork && deployedNetwork.address);
        contract.setProvider(web3)
        contract.options.address = contractAddress

        console.log(contract);
        const response = await contract.methods.purchase(0x000000000000000000000000000000000000010).call();
    
        console.log( accounts[0]);
        setAccountId(accounts[0])
      } catch (err) {
        console.log(err);
      }
    }
    fetchData()
  }, [])




  return (
    <>

      <div className="App">
        <header className="App-header">
          <p>
            MetaLand! {accountId}
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
