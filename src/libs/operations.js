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
    compoundDeposit(amount);
  }

  if (market === "Aave" && type === "DAI") {
    aaveDeposit(amount);
  }
};

export const withdraw = (market, type, amount) => {
  if (market === "Compound") {
    if (type === "cDAI") {
      compoundWithdraw(amount);
    }
  }

  if (market === "Aave") {
    if (type === "aDAI") {
      aaveWithdraw(amount);
    }
  }
};
