import { useEffect, useState } from 'react'
import tokens from '../connection/tokens'
import erc20Abi from '../ABIs/erc20'
import Web3 from 'web3'

function TokenBalance(props) {
  const [tokenBalance, setTokenBalance] = useState(0)
  const web3 = new Web3(window.ethereum)
  let walletAddress = '0x4aB289D129F77676C9d239fD22bf8cd62F8b13E3'
  let contract = new web3.eth.Contract(erc20Abi, props.tokenAddress)
  function getBalance() {
    return contract.methods.balanceOf(walletAddress).call()
  }
  getBalance().then(function (result) {
    setTokenBalance(result)
  })

  return (
    <div>
      <span>{props.tokenName} : </span>

      <span> {tokenBalance}</span>
    </div>
  )
}

export default TokenBalance
