import {useState, useEffect} from 'react'
import PurchaseLandData from "../PurchaseLand.json"
import getWeb3 from "./getWeb3"

const contractAddress = "0x20c17A64714a43315E8ED91772589d6aE4BA273F"
export const usePurchaseLandContract = () => {

    const [web3, setWeb3] = useState(null)
    const [accounts, setAccounts] = useState(null)
    const [contract, setContract] = useState(null)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          let web3Response = await getWeb3()
          setWeb3(web3Response)
        } catch (err) {
          console.log(err);
        }
      }
      fetchData()
    }, [])
  
    useEffect(() => {
      console.log("web3")
  
      const updatedWeb3 = async () => {
        if(web3)
        try {
          const accountsResponse = await web3.eth.getAccounts();
          setAccounts(accountsResponse)
        } catch (err) {
          console.log(err);
        }
      }
      updatedWeb3()
    }, [web3])
  
    useEffect(() => {
      console.log("accounts");
      const updatedAccounts = async () => {
        if(accounts)
        try {
          const deployedNetwork = PurchaseLandData.networks[5777];
          console.log(accounts);
          let contractResponse = new web3.eth.Contract(
            PurchaseLandData.abi,
            deployedNetwork && deployedNetwork.address,{from: accounts[0]});
            // const instance = await PurchaseLand.deployed();
  
          contractResponse.setProvider(web3)
          contractResponse.options.address = contractAddress
          setContract(contractResponse)
        } catch (err) {
          console.log(err);
        }
      }
      updatedAccounts()
  
    }, [accounts])
  

    return  [contract, accounts]
  



}