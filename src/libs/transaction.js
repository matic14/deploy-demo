const sendTransaction = (tx, options = {}) => {
  return tx
    .estimateGas()
    .then((gas) => {
      return tx.send({ ...options, gas });
    })
    .catch(console.log);
};
