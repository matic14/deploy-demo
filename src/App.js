import React, { useState, useEffect } from "react";
import "./App.css";
import Deposit from "./components/Deposit";
import Withdrawl from "./components/Withdraw";
import Balance from "./components/Balance";
import { loadWeb3 } from "./connection/walletConnection";
import markets from "./configs/markets";
import { myToken } from "./libs/tokens";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [market, setMarket] = useState("");

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
  };

  const onMarketChange = (e) => {
    setMarket(e.target.value);
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
            <select
              className="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              value={market}
              onChange={onMarketChange}
            >
              <option defaultValue="Aave">Select one</option>
              {markets.map((market) => (
                <option
                  style={{ fontSize: "1rem" }}
                  value={market.name}
                  key={market.name}
                >
                  {market.name}
                </option>
              ))}
            </select>
            <div className="content mr-auto ml-auto">
              <Deposit account={account} balance={balance} market={market} />
              <Withdrawl account={account} balance={balance} market={market} />
            </div>
            {/* <Balance /> */}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
