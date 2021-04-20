import { useEffect, useState } from "react";
import tokens from "../connection/tokens";
import markets from "../configs/markets";

const Market = (props) => {
  return (
    <div>
      {markets.map((market) => {
        return <h3>{market.name}</h3>;
      })}
    </div>
  );
};

export default Market;
