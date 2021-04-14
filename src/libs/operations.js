import tokens from "../connection/tokens";
import erc20Abi from "../ABIs/erc20";
import Web3 from "web3";
import AaveAbi from "../ABIs/AaveLendingPool.json";
// import compoundAbi from "../ABIs/Compound.json";
import eErc20Abi from "../ABIs/cToken.json";

const loadBlockchainData = async () => {
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  const erc20Token = new web3.eth.Contract(
    erc20Abi,
    "0x6b175474e89094c44da98b954eedeac495271d0f"
  );
  let ercTokenBalance = await erc20Token.methods.balanceOf(accounts[0]).call();
  console.log("erc20Token", erc20Token);
  console.log("ercTokenBalance", ercTokenBalance);

  //   const compoundData = new web3.eth.Contract(
  //     compoundAbi,
  //     "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643"
  //   );

  //   setCompound(compoundData);
  //   console.log("compoundData ", compoundData);

  const erc20Data2 = new web3.eth.Contract(
    erc20Abi,
    "0x028171bCA77440897B824Ca71D1c56caC55b68A3"
  );
  let ercTokenBalance2 = await erc20Data2.methods.balanceOf(accounts[0]).call();
  console.log("ADAI DATA ", erc20Data2);
  console.log("ADAI Balance", ercTokenBalance2);
  // setTokenBalance(ercTokenBalance2);

  const lendingPool = new web3.eth.Contract(
    AaveAbi,
    "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9"
  );

  const cErc20 = new web3.eth.Contract(
    eErc20Abi,
    "0x5d3a536e4d6dbd6114cc1ead35777bab948e3643"
  );
  console.log("cErc20 ", cErc20);

  const aDaiToken = new web3.eth.Contract(
    erc20Abi,
    "0x028171bCA77440897B824Ca71D1c56caC55b68A3"
  );
  //   let ercTokenBalance2 = await aDaiToken.methods.balanceOf(accounts[0]).call();
  //   console.log("aDaiToken DATA ", aDaiToken);
  //   console.log("aDaiToken Balance", ercTokenBalance2);
  //   // setTokenBalance(ercTokenBalance2);

  return { account, erc20Token, cErc20, lendingPool, aDaiToken, erc20Data2 };
};

export const deposit = (market, type, amount) => {
  console.log("OPERATION Deposit token", market, type, amount);

  if (market === "Compound") {
    if (type === "DAI") {
      loadBlockchainData().then(({ account, erc20Token, cErc20 }) => {
        console.log("Indeposit", account);
        if (cErc20 !== "undefined") {
          return erc20Token.methods
            .approve(cErc20._address, amount)
            .send({ from: account })
            .then(function (receipt) {
              console.log("receipt", receipt);
              cErc20.methods.mint(amount).send({
                from: account,
              });
            })
            .catch(console.log);
        }
      });
    }
  }

  if (market === "Aave") {
    if (type === "DAI") {
      loadBlockchainData().then(({ account, erc20Token, lendingPool }) => {
        console.log("Indeposit", account);
        if (lendingPool !== "undefined") {
          // try {
          return erc20Token.methods
            .approve("0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9", amount)
            .send({ from: account })
            .on("receipt", (hash) => {
              lendingPool.methods
                .deposit(erc20Token._address, amount.toString(), account, 0)
                .send({ from: account });
            })
            .catch(console.log);
        }
      });
    }
  }
};

export const withdraw = (market, type, amount) => {
  if (market === "Compound") {
    if (type === "cDAI") {
      loadBlockchainData().then(({ account, erc20Token, cErc20 }) => {
        console.log("Indeposit", account);
        if (cErc20 !== "undefined") {
          cErc20.methods
            .redeem(amount)
            .send({ from: account })
            .then(console.log)
            .catch(console.log);
        }
      });
    }
  }

  if (market === "Aave") {
    if (type === "aDAI") {
      loadBlockchainData().then(({ account, lendingPool, erc20Token }) => {
        if (lendingPool !== "undefined") {
          lendingPool.methods
            .withdraw(erc20Token._address, amount, account)
            .send({ from: account })
            .catch(console.log);
        }
      });
    }
  }
};
