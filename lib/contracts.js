const _ = require('co-lodash');

function abiItemToContracts(web3, abiItem) {
  return _.chain(abiItem)
    .map((abi, address) => [address, web3.loadContract(abi, address)])
    .fromPairs()
    .value()
}

module.exports = (web3, abiDesc) => {
  return _.chain(abiDesc)
    .map((abiItem, field) => [field, abiItemToContracts(web3, abiItem)])
    .fromPairs()
    .value();
};
