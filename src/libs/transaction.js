export const sendTransaction = (tx, account, options = {}) => {
  return tx.estimateGas().then((gas) => {
    return tx.send({ ...options, gas, from: account });
  });
};
