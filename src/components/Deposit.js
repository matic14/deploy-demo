import { useEffect, useState } from "react";
import tokens from "../connection/tokens";
import erc20Abi from "../ABIs/erc20";
import { deposit } from "../libs/operations";
import availableTokens from "../configs/availableTokens";
import { Spinner } from "react-bootstrap";

const Deposit = (props) => {
  const [inputToken, setInputToken] = useState("DAI");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [inputAmount, setInputAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    message: "",
  });

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
    setLoading(true);
    setMessage({ message: "" });
    console.log("loadinndhfksdhfhds,", loading);
    deposit(props.market, inputToken, inputAmount)
      .then(() => {
        setLoading(false);
        setMessage({ message: `Transaction success`, transactionStatus: true });
      })
      .catch((e) => {
        setLoading(false);
        setMessage({
          message: `Transaction Fails. Please try again`,
          transactionStatus: false,
        });
      });
  };

  function getTokensDisplay(availableTokens) {
    const tokensToDisplay = [];
    Object.entries(availableTokens).forEach((token) => {
      const mToken = token[1].protocols;
      mToken.filter((marketToken) => {
        if (props.market.toLowerCase() === marketToken.name.toLowerCase())
          tokensToDisplay.push(<option key={token[0]}>{token[0]}</option>);
      });
    });
    return tokensToDisplay;
  }
  return (
    <div className="card mb-4">
      {/* {getLoading()} */}
      {/* {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <span>notloading</span>
      )} */}
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
              {getTokensDisplay(availableTokens)}
              {/* {tokens.map((token) => (
                <option
                  style={{ fontSize: "1rem" }}
                  value={token.name}
                  key={token.name}
                >
                  {token.name}
                </option>
              ))} */}
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
          {loading ? (
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              value="Submit"
              disabled
            >
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Depositing
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg"
              value="Submit"
              id="submitButton"
              // onClick={setLoading({ loading: true })}
            >
              Deposit
            </button>
          )}
          {/* {message.status? <p>{message.message}</p>} */}
          {message.transactionStatus ? (
            <p style={{ color: "green" }}>{message.message}</p>
          ) : (
            <p style={{ color: "red" }}>{message.message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Deposit;
