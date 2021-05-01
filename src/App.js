import React, { useState, useEffect } from 'react'
import './App.css'
import Deposit from './components/Deposit'
import Withdrawl from './components/Withdraw'
import Balance from './components/Balance'
import { loadWeb3 } from './connection/walletConnection'
import markets from './configs/markets'
import Market from './components/Market'
import WalletModal from './components/WalletModal'
import { Button } from 'react-bootstrap'
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
function App() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [market, setMarket] = useState('')
  const [modalShow, setModalShow] = React.useState(false)

  useEffect(() => {
    async function loadData() {
      await loadWeb3()
      await loadBlockchainData()
    }
    loadData()
  }, [])

  const getLibrary = (provider) => {
    // console.log('WEB3PROVIDER', new Web3Provider(provider))
    return new Web3(provider)
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    const networkId = await web3.eth.net.getId()

    console.log('networkId -- ', networkId)

    if (typeof accounts[0] !== 'undefined') {
      const balance = await web3.eth.getBalance(accounts[0])
      const balInEther = await web3.utils.fromWei(balance, 'ether')
      setBalance(balInEther)
      setAccount(accounts[0])
    } else {
      window.alert('Please login with MetaMask')
    }
  }

  const onMarketChange = (e) => {
    setMarket(e.target.value)
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div>
        <div className="main-container">
          <div className="header"></div>
          <div className="sidebar">
            <Market onMarketChange={onMarketChange} />
          </div>
          <div className="main">
            <WalletModal />
            <div className="container-fluid mt-5">
              <div className="row">
                <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '800px' }}>
                  <div className="content mr-auto ml-auto">
                    <Deposit account={account} balance={balance} market={market} />
                    <Withdrawl account={account} balance={balance} market={market} />
                  </div>
                </main>
              </div>
            </div>
          </div>
          <div className="right-bar">
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Connect Wallet
            </Button>

            <WalletModal show={modalShow} onHide={() => setModalShow(false)} />
            <Balance />
          </div>
          <div className="footer"></div>
        </div>
      </div>
    </Web3ReactProvider>
  )
}

export default App
