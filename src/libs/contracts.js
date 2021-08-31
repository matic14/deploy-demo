import erc20Abi from '../ABIs/erc20'
import AaveAbi from '../ABIs/AaveLendingPool.json'
import compoundAbi from '../ABIs/Compound.json'
import cTokenAbi from '../ABIs/cToken.json'

export const initContract = async () => {
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]

  const erc20Token = new web3.eth.Contract(erc20Abi, '0x6b175474e89094c44da98b954eedeac495271d0f')

  const compound = new web3.eth.Contract(compoundAbi, '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643')

  const lendingPool = new web3.eth.Contract(AaveAbi, '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9')

  const cToken = new web3.eth.Contract(cTokenAbi, '0x5d3a536e4d6dbd6114cc1ead35777bab948e3643')

  const aDaiToken = new web3.eth.Contract(erc20Abi, '0x028171bCA77440897B824Ca71D1c56caC55b68A3')

  return { account, erc20Token, cToken, lendingPool, aDaiToken, compound }
}
