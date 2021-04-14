import { useState } from "react";
import tokens from "../connection/tokens";
import erc20Abi from "../ABIs/erc20";
import { deposit } from "../libs/operations";
// import Aave from "../ABIs/AaveLendingPool.json";

const Deposit = (props) => {
  const [inputToken, setInputToken] = useState("Ether");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);

  // useEffect(() => {
  //   setTokenBalance(props.tokenBalance1);
  // }, []);

  function onTokenChange(e) {
    setInputToken(e.target.value);
    let balance = getTokenBalance(e.target.value);
    console.log("TOKEN_BALANCE --", balance);
  }

  function getTokenBalance(reqtoken) {
    console.log("token --- ", reqtoken);
    const web3 = window.web3;
    const tokenValue = tokens.filter((token) => token.name === reqtoken);

    let walletAddress = "0x4aB289D129F77676C9d239fD22bf8cd62F8b13E3";

    // console.log("tokenValue", tokenValue);
    let contract = new web3.eth.Contract(erc20Abi, tokenValue[0].tokenAddress);
    console.log("contract --", contract);
    function getBalance() {
      return contract.methods.balanceOf(walletAddress).call();
    }

    getBalance().then(function (result) {
      setTokenBalance(result);
    });

    console.log("setTokenBalance  ", tokenBalance);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // props.depositTokenToCompound(inputAmount);
    deposit(props.market, inputToken, inputAmount);
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
              {tokens.map((token) => (
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
            Deposit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
