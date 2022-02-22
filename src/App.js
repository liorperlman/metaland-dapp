
import './App.css';
import React, { useEffect, useState }  from 'react';
import Map from "./components/Map.js"
import web3 from "web3";
import { useWeb3Context } from 'web3-react'

import PurchaseLandAbi from "./PurchaseLand.json"


const App = () => {
  const[accountId, setAccountId] = useState("")

  
  const context = useWeb3Context()
  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])

    if (!context.active && !context.error) {
      // loading
      return 
    } else if (context.error) {
      //error
      return 
    } else {
      // success
      return 
    }
  }, [])
// useEffect(() => {
//   const fetchNetworkId = async()=> {
//   const networkId = await web3.eth.net.getId();
//   return networkId
//   }
//   const id = fetchNetworkId()
// const deployedNetwork = PurchaseLandAbi.networks[id];
// const PurchaseLand = web3.eth.Contract(
//   PurchaseLandAbi.abi,
//   deployedNetwork && deployedNetwork.address,
// );
//   console.log(PurchaseLand);
// },[])

  // const { active, account, library, activate,deactivate } = useWeb3React()
  // async function connect() {
  //   try {
  //     await activate(injected);
  //   } catch (ex) {
  //     console.log(account)
  //   }
  // }
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
