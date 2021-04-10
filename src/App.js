// import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import Deposit from "./components/Deposit";
import Withdrawl from "./components/Withdraw";
import erc20Abi from "./ABIs/erc20";
import AaveAbi from "./ABIs/AaveLendingPool.json";
import compoundAbi from "./ABIs/Compound.json";
import eErc20Abi from "./ABIs/cErc20.json";

import { loadWeb3 } from "./connection/walletConnection";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [ercToken, setErcToken] = useState({});
  const [ercToken2, setErcToken2] = useState({});
  const [lendingPool, setLendingPool] = useState({});
  const [compound, setCompound] = useState({});
  const [cErc20, setCErc20] = useState({});

  

  useEffect(() => {
    async function loadData() {
      await loadWeb3();
      await loadBlockchainData();
    }
    loadData();
  }, []);

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    console.log("networkId -- ", networkId);

    if (typeof accounts[0] !== "undefined") {
      const balance = await web3.eth.getBalance(accounts[0]);
      const balInEther = await web3.utils.fromWei(balance, "ether");
      setBalance(balInEther);
      setAccount(accounts[0]);
    } else {
      window.alert("Please login with MetaMask");
    }

    const erc20Data = new web3.eth.Contract(
      erc20Abi,
      "0x6b175474e89094c44da98b954eedeac495271d0f"
    );
    let ercTokenBalance = await erc20Data.methods.balanceOf(accounts[0]).call();
    console.log("erc20Data", erc20Data);
    console.log("ercTokenBalance", ercTokenBalance);
    setTokenBalance(ercTokenBalance);

    setErcToken(erc20Data);

    // const erc20Data2 = new web3.eth.Contract(
    //   erc20Abi,
    //   "0x028171bCA77440897B824Ca71D1c56caC55b68A3"
    // );
    // let ercTokenBalance2 = await erc20Data2.methods
    //   .balanceOf(accounts[0])
    //   .call();
    // console.log("ADAI DATA ", erc20Data2);
    // console.log("ADAI Balance", ercTokenBalance2);
    // // setTokenBalance(ercTokenBalance2);

    // setErcToken2(erc20Data2);

    // const aaveTokenData = new web3.eth.Contract(
    //   AaveAbi,
    //   "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"
    // );

    // setLendingPool(aaveTokenData);
    // console.log("Aave Token Address", aaveTokenData._address);


    const compoundData = new web3.eth.Contract(
      compoundAbi,
      "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643"
    );

    setCompound(compoundData);
    console.log("compoundData ", compoundData);

    const cErcData = new web3.eth.Contract(
      eErc20Abi,
      "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643"
    );

    setCErc20(cErcData);
    console.log("cErcData ", cErcData);




  };

  // const depositToken = (amount) => {
  //   console.log("Deposit Token Amt ", amount);
  //   console.log("Account", account);
  //   if (lendingPool !== "undefined") {
  //     // try {
  //     return ercToken.methods
  //       .approve("0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9", amount)
  //       .send({ from: account })
  //       .on("receipt", (hash) => {
  //         lendingPool.methods
  //           .deposit(ercToken._address, amount.toString(), account, 0)
  //           .send({ from: account });
  //       })
  //       .catch(console.log);
  //   }
  // };

  // const withdrawToken = (amount) => {
  //   console.log("Withdraw Token Amt ", amount);
  //   console.log("Account", account);
  //   console.log("amount", amount);
  //   if (lendingPool !== "undefined") {
  //     lendingPool.methods
  //       .withdraw(ercToken._address, amount, account)
  //       .send({ from: account });
  //     // })
  //     // .catch(console.log);
  //   }
  // };


  console.log("ercToken--",ercToken )

  const depositTokenToCompound = (amount) => {
    console.log("Deposit Token Amt ", amount);
    console.log("Account", account);

    console.log("CERC20 -- ",cErc20);
    if (cErc20 !== "undefined") {
      // try {
      return ercToken.methods
        .approve(cErc20._address, amount)
        .send({ from: account })
        .then( function(receipt){
          console.log("receipt", receipt);
          cErc20.methods
            .mint(amount)
            .send({ 
              from: account
             });
        })
        .catch(console.log);
    }
  };

  const withdrawTokenFromCompound = (amount) => {
    console.log("Withdraw Token Amt ", amount);
    console.log("Account", account);
    console.log("amount", amount);
    if (compound !== "undefined") {
      compound.methods
        // .redeem(ercToken._address, amount, account)
        .send({ from: account });
      // })
      // .catch(console.log);
    }
  };

  return (
    <div>
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "800px" }}
          >
            <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
              <option  defaultValue= "1">Select one</option>
              <option value="1">Aave</option>
              <option value="2">Compound</option>
            </select>
            <div className="content mr-auto ml-auto">
              
              <Deposit
                account={account}
                balance={balance}
                tokenBalance1={tokenBalance}
                ercToken={ercToken}
                lendingPool={lendingPool}
                // depositToken={depositToken}
                // getTokenBalance={getTokenBalance}

                depositTokenToCompound = {depositTokenToCompound}
              />
              <Withdrawl
                account={account}
                balance={balance}
                withdrawTokenFromCompound={withdrawTokenFromCompound}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
