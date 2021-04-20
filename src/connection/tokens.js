// import erc20Abi from "../ABIs/erc20";
// import Web3 from "web3";

// function getTokenBalance(tokenAddress) {
//   // return tokenAddress;
//   const web3 = new Web3(window.ethereum);
//   console.log("web3", web3);
//   let walletAddress = "0x4aB289D129F77676C9d239fD22bf8cd62F8b13E3";
//   let contract = new web3.eth.Contract(erc20Abi, tokenAddress);
//   return contract.methods.balanceOf(walletAddress).call();
// }

const tokens = [
  {
    symbol: "DAI",
    name: "DAI",
    tokenAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    // getBalance() {
    //   return getTokenBalance(this.tokenAddress);
    // },
  },
  {
    symbol: "UNI",
    name: "UNI",
    tokenAddress: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
  },
  {
    symbol: "renBTC",
    name: "renBTC",
    tokenAddress: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
  },
  {
    symbol: "wBTC",
    name: "wBTC",
    tokenAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
  },

  {
    symbol: "USDC",
    name: "USDC",
    tokenAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
];

export default tokens;
