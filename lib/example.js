const Web3Wallet = require('web3-wallet');

const wallet = Web3Wallet.wallet.generate();
const web3 = Web3Wallet.create(wallet, 'http://localhost:9545');

const contracts = require('./contracts')(web3, require('../build/abi.json'));

(async () => {
  const erc721 = Object.values(contracts.swap721Tokens)[0];

  const oracleAddr = await erc721.oracle();
  const oracle = contracts.oracles[oracleAddr];

  const collateralAddr = await erc721.floatingLegCollateral();
  const collateral = contracts.collaterals[collateralAddr];

  console.log('Oracle:', oracle.address);
  console.log('Collateral:', collateral.address, 'underlying token', await collateral.underlying());
})();
