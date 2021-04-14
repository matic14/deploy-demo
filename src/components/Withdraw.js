import { useState, useEffect } from "react";
import withdrawTokens from "../connection/withdrawToken";
import erc20Abi from "../ABIs/erc20";
import Aave from "../ABIs/AaveLendingPool.json";
import { withdraw } from "../libs/operations";

const Deposit = (props) => {
  const [inputToken, setInputToken] = useState("Ether");
  const [tokenBalance, setTokenBalance] = useState(props.tokenBalance1);
  const [inputAmount, setInputAmount] = useState(0);

  function onTokenChange(e) {
    setInputToken(e.target.value);
    let balance = getTokenBalance(e.target.value);
    console.log("TOKEN_BALANCE --", balance);
  }

  function getTokenBalance(reqtoken) {
    console.log("token --- ", reqtoken);
    const web3 = window.web3;
    const tokenValue = withdrawTokens.filter(
      (token) => token.name === reqtoken
    );

    let walletAddress = "0x32feA766F5B862Af1e0D003caC670c5BA2079070";

    console.log("tokenValue", tokenValue);
    let contract = new web3.eth.Contract(erc20Abi, tokenValue[0].tokenAddress);
    console.log("contract --", contract);
    function getBalance() {
      return contract.methods.balanceOf(walletAddress).call();
    }

    getBalance().then(function (result) {
      setTokenBalance(result);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.withdrawToken(inputAmount);
    withdraw(props.market, inputToken, inputAmount);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <form className="mb-3" onSubmit={handleSubmit}>
          <div>
            <span className="float-left text-muted">{props.account}</span>
            <span className="float-right text-muted">
              Balance: {tokenBalance}
              {/* Balance: {tokenBalance === 0 ? tokenBalance : props.tokenBalance} */}
            </span>
          </div>
          <div>
            <select
              className="form-control"
              id="sel1"
              style={{ marginBottom: "25px" }}
              value={inputToken}
              onChange={onTokenChange}
            >
              {withdrawTokens.map((token) => (
                <option
                  style={{ fontSize: "1rem" }}
                  value={token.name}
                  key={token.name}
                >
                  {token.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="0"
              required
              onChange={(e) => {
                e.preventDefault();
                setInputAmount(e.target.value);
              }}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <img src="" height="32" alt="" />
                &nbsp;&nbsp;&nbsp; Ether
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            value="Submit"
            id="submitButton"
          >
            Withdraw
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
