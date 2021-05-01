import { initContract } from "../contracts";
import { sendTransaction } from "../transaction";

export function deposit(amount) {
  return initContract().then(({ account, erc20Token, cToken }) => {
    if (cToken !== "undefined") {
      console.log("In deposit c opeartion");
      const tx = erc20Token.methods.approve(cToken._address, amount);
      return sendTransaction(tx, account).then(function (receipt) {
        if (receipt.status) {
          const tx = cToken.methods.mint(amount);
          console.log("tx", tx);
          return sendTransaction(tx, account);
        } else throw new Error("Transaction Not Approved");
      });
    }
  });
}

export function withdraw(amount) {
  initContract().then(({ account, erc20Token, cToken }) => {
    if (cToken !== "undefined") {
      const tx = cToken.methods.redeem(amount);
      sendTransaction(tx, account).then(console.log).catch(console.log);
    }
  });
}
