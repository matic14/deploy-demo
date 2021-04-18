import { initContract } from "../contracts";
import { sendTransaction } from "../transaction";

export function deposit(amount) {
  initContract().then(({ account, erc20Token, cToken }) => {
    if (cToken !== "undefined") {
      const tx = erc20Token.methods.approve(cToken._address, amount);
      sendTransaction(tx, account)
        .then(function (receipt) {
          if (receipt.status) {
            const tx = cToken.methods.mint(amount);
            console.log("tx", tx);
            sendTransaction(tx, account);
          } else throw new Error("Transaction Not Approved");
        })
        .catch((e) => {
          console.log(e);
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
