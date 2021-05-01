import { initContract } from "../libs/contracts";
import {
  deposit as compoundDeposit,
  withdraw as compoundWithdraw,
} from "./Compound/operation";
import {
  deposit as aaveDeposit,
  withdraw as aaveWithdraw,
} from "./Aave/operation";

export const deposit = (market, type, amount) => {
  console.log("OPERATION Deposit token", market, type, amount);

  if (market === "Compound" && type === "DAI") {
    return compoundDeposit(amount);
  }

  if (market === "Aave" && type === "DAI") {
    return aaveDeposit(amount);
  }
};

export const withdraw = (market, type, amount) => {
  if (market === "Compound" && type === "cDAI") {
    compoundWithdraw(amount);
  }

  if (market === "Aave" && type === "aDAI") {
    aaveWithdraw(amount);
  }
};
