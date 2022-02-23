
import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Map from "./components/Map.js"
import web3 from "web3";
import PurchaseLandData from "./PurchaseLand.json"
import getWeb3 from "./hooks/getWeb3"


const contractAddress = "0x241A219685beA031590303e754Bb603Bdd06D977"
const App = () => {
  const [storageValue, setStorageValue] = useState(0)
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState(null)
  const [contract, setContract] = useState(null)
  const [accountId, setAccountId] = useState("")
  let purchaseLandInstance;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const networkId = await web3.net.getId();
        const deployedNetwork = PurchaseLandData.networks[5777];
        const web3Response = await getWeb3()
        setWeb3(web3Response)
        console.log(web3)
        /*const accountsResponse = await web3.eth.getAccounts();
        setAccounts(accountsResponse)

        let contractResponse =  new web3.eth.Contract(
          PurchaseLandData.abi,
          deployedNetwork && deployedNetwork.address);
        
        
        contractResponse.setProvider(web3)
        contractResponse.options.address = contractAddress
        setContract(contractResponse)
        

        // console.log(contract);
        
        // const response = await contract.methods.purchase(0x000000000000000000000000000000000000010).call();
    
        // console.log( accounts[0]);
        setAccountId(accounts[0])*/
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
