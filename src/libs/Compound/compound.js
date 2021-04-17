import cTokenAbi from "../../ABIs/cToken.json";
import erc20Abi from "../../ABIs/erc20.json";
import { createContract } from "../contracts";

export function deposit(amount) {
  createContract().then(({ account, erc20Token, cToken }) => {
    if (cToken !== "undefined") {
      return erc20Token.methods
        .approve(cToken._address, amount)
        .send({ from: account })
        .then(function (receipt) {
          console.log("receipt", receipt);
          cToken.methods.mint(amount).send({
            from: account,
          });
        })
        .catch(console.log);
    }
  });
}
