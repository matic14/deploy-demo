import { useState, useEffect } from 'react'
import ConnectorItem from './ConnectorItem'
// import { FC } from 'react'
import { injected, walletconnect, portis, walletlink, fortmatic } from './Connectors'
import { Modal, Grid } from '@geist-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from './useEagerConnect'
// interface Web3ModalProps {
//   setVisible: Function;
// }

const Web3Modal = () => {
  //   console.log('kjdsfhjkhfkh', walletconnect)
  const itemList = [
    {
      icon: 'metamask.svg',
      title: 'Metamask',
      connector: injected,
    },
    {
      icon: 'walletconnect.svg',
      title: 'Wallet Connect',
      connector: walletconnect,
    },
    {
      icon: 'portis.svg',
      title: 'Portis',
      connector: portis,
    },
    {
      icon: 'coinbase.svg',
      title: 'Coinbase',
      connector: walletlink,
    },
    {
      icon: 'fortmatic.svg',
      title: 'Fortmatic',
      connector: fortmatic,
    },
  ]
  const [activatingConnector, setActivatingConnector] = useState()
  const [ethereum, setEthereum] = useState()
  const { connector, activate, deactivate, error, account, chainId } = useWeb3React()

  useEffect(() => {
    if (chainId && chainId !== 1) {
      deactivate()
    }
  }, [chainId, deactivate])

  const onConnectClick = (web3connector) => {
    if (connector === web3connector) {
      deactivate()
    } else {
      setActivatingConnector(web3connector)
      activate(web3connector)
    }
  }

  //   useEffect(() => {
  //     if (account) setVisible(false)
  //   }, [account, setVisible])

  //   useEffect(() => {
  //     if (activatingConnector && error) {
  //       if (connector && connector.walletConnectProvider) {
  //         connector.walletConnectProvider = undefined
  //       }
  //       deactivate()
  //     }
  //     if (activatingConnector && activatingConnector === connector) {
  //       setActivatingConnector(undefined)
  //     }
  //   }, [activatingConnector, connector, deactivate, error])

  //   useEffect(() => {
  //     const { ethereum } = window
  //     setEthereum(ethereum)
  //   }, [])

  //   const triedEager = useEagerConnect()
  //   useInactiveListener(!triedEager || !!activatingConnector)

  return (
    // <p>dsfkhf</p>
    // <Modal width="500px">
    //   <Modal.Title>Connect Wallet</Modal.Title>
    //   <Modal.Content>
    <Grid.Container gap={2}>
      {itemList.map(({ icon, title, connector: web3connector }, index) => {
        // const currentConnector = web3connector
        // const activating = currentConnector === activatingConnector
        // const connected = currentConnector === connector
        return (
          <button
            style={{ marginTop: '20px', marginRight: '20px' }}
            key={title}
            onClick={() => onConnectClick(web3connector)}
          >
            {title}
          </button>
          //   <Grid xs={12} key={index}>
          //     <ConnectorItem
          //       icon={icon}
          //       disabled={title === 'Metamask' && !ethereum}
          //       title={title}
          //       loading={activating}
          //       onClick={() => onConnectClick(web3connector)}
          //     />
          //   </Grid>
        )
      })}
    </Grid.Container>
    //   </Modal.Content>
    // </Modal>
  )
}

export default Web3Modal
