import DAI from "../ABIs/DAI.json";
import cToken from "../ABIs/cToken.json";
import aToken from "../ABIs/aToken.json";

const availableTokens = {
  DAI: {
    abi: DAI,
    token: "DAI",
    decimals: 18,
    enabled: true,
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
    protocols: [
      {
        enabled: true,
        abi: cToken.abi,
        name: "compound",
        address: "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
        token: "cDAI",
        decimals: 28,
      },
      {
        abi: aToken,
        name: "aave",
        enabled: true,
        address: "0xfC1E690f61EFd961294b3e1Ce3313fBD8aa4f85d",
        token: "aDAI",
        decimals: 18,
        functions: {},
      },
      {
        abi: aToken,
        name: "aavev2",
        enabled: true,
        address: "0x028171bCA77440897B824Ca71D1c56caC55b68A3",
        token: "aDAIv2",
        decimals: 18,
      },
    ],
  },
  USDC: {
    decimals: 6,
    token: "USDC",
    enabled: true,
    govTokensDisabled: false,
    color: "hsl(211, 67%, 47%)",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",

    protocols: [
      {
        name: "compound",
        enabled: true,
        abi: cToken.abi,
        address: "0x39aa39c021dfbae8fac545936693ac917d5e7563",
        token: "cUSDC",
        decimals: 16,
      },
      {
        name: "fulcrum",
        enabled: false,
        address: "0xf013406a0b1d544238083df0b93ad0d2cbe0f65f",
        token: "iUSDC",
        decimals: 18,
      },
      {
        name: "aave",
        enabled: true,
        abi: aToken,
        address: "0x9bA00D6856a4eDF4665BcA2C2309936572473B7E",
        token: "aUSDC",
        decimals: 18,
        functions: {},
      },
      {
        abi: aToken,
        decimals: 18,
        enabled: true,
        name: "aavev2",
        token: "aUSDCv2",
        address: "0xBcca60bB61934080951369a648Fb03DF4F96263C",
        functions: {},
      },
      {
        name: "dydx",
        enabled: true,
        address: "0xd2F45883627f26EC34825486ca4c25235A0da0C3",
        token: "yxUSDC",
        decimals: 18,
      },
    ],
  },
};

export default availableTokens;
