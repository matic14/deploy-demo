import erc20Abi from "../ABIs/erc20";
import Tokens from "./tokens";

export function getTokenBalance(token) {
  console.log("token --- ", token);
  const web3 = window.web3;
  let tokenBalance = "";
  let tokenAddress = Tokens[0].tokenAddress;
  let walletAddress = "0x32feA766F5B862Af1e0D003caC670c5BA2079070";

  let contract = new web3.eth.Contract(erc20Abi, tokenAddress);
  console.log("contract --", contract);
  function getBalance() {
    return contract.methods.balanceOf(walletAddress).call();
  }

  tokenBalance = getBalance().then(function (result) {
    console.log("result--", result);
    return result;
  });

  console.log("tokenBalance", tokenBalance);
}
