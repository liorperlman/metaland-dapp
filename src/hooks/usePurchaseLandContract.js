import {useState, useEffect} from 'react'
import PurchaseLandData from "../PurchaseLand.json"
import getWeb3 from "./getWeb3"

const contractAddress = "0x57Ce273871743C485F59189CF47221D3244E503C"
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
      const updatedAccounts = async () => {
        if(accounts)
        try {
          const deployedNetwork = PurchaseLandData.networks[5777];
          let contractResponse = new web3.eth.Contract(
            PurchaseLandData.abi,
            deployedNetwork && deployedNetwork.address,{from: accounts[0]});
  
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