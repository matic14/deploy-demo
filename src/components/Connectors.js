import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { PortisConnector } from '@web3-react/portis-connector'

const POLLING_INTERVAL = 12000
const RPC_URLS = {
  1: 'https://mainnet.infura.io/v3/806abeb246b34e19b2fbed050506e68b',
  1337: 'https://mainnet.infura.io/v3/806abeb246b34e19b2fbed050506e68b',
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 1337],
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[1],
  appName: 'Pickle Finance',
  appLogoUrl: 'pickle.png',
})

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.Fortmatic,
  chainId: 1,
})

export const portis = new PortisConnector({
  dAppId: process.env.Portis,
  networks: [1],
})
