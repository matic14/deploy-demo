import { useEffect, useState } from "react";
import tokens from "../connection/tokens";
import erc20Abi from "../ABIs/erc20";
import Web3 from "web3";
import TokenBalance from "./TokenBalance";

const Balance = (props) => {
  return (
    <div>
      {tokens.map((token) => {
        return (
          <TokenBalance
            key={token.name}
            tokenAddress={token.tokenAddress}
            tokenName={token.name}
          />
        );
      })}
    </div>
  );
};

export default Balance;
