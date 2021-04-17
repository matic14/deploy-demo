import { createContract } from "../libs/contracts";
import { deposit as cdeposit } from "./Compound/compound";

export const deposit = (market, type, amount) => {
  console.log("OPERATION Deposit token", market, type, amount);

  if (market === "Compound") {
    if (type === "DAI") {
      createContract().then(({ account, erc20Token, cToken }) => {
        cdeposit(amount);
      });
    }
  }

  if (market === "Aave") {
    if (type === "DAI") {
      createContract().then(({ account, erc20Token, lendingPool }) => {
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
      createContract().then(({ account, erc20Token, cToken }) => {
        console.log("Indeposit", account);
        if (cToken !== "undefined") {
          cToken.methods
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
      createContract().then(({ account, lendingPool, erc20Token }) => {
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
