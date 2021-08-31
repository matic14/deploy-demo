import { initContract } from '../contracts'
import { sendTransaction } from '../transaction'

export function deposit(amount) {
  initContract().then(({ account, erc20Token, lendingPool }) => {
    if (lendingPool !== 'undefined') {
      const tx = erc20Token.methods.approve(erc20Token._address, amount)
      sendTransaction(tx, account)
        .then(function (receipt) {
          console.log(receipt)
          if (receipt.status) {
            const tx = lendingPool.methods.deposit(erc20Token._address, amount.toString(), account, 0)
            console.log('tx', tx)
            sendTransaction(tx, account)
          } else throw new Error({ msg: 'Transaction Not Approved' })
        })
        .catch((e) => {
          console.log('HHKJHSKHDKJH', e.message.msg)
        })
    }
  })
}

export function withdraw(amount) {
  initContract().then(({ account, lendingPool, erc20Token }) => {
    if (lendingPool !== 'undefined') {
      const tx = lendingPool.methods.withdraw(erc20Token._address, amount, account)
      sendTransaction(tx, account).catch(console.log)
    }
  })
}
