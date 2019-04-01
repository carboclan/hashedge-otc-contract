const _ = require('co-lodash');
const Web3Wallet = require('web3-wallet');

const account = '0xDe8Fc290a265C78d4CfD1C509241DaE22687193E';
const wallet = Web3Wallet.wallet.fromPrivateKey('87e238ed3018f024f2594054b8cfd716af2835e48602de1b201e2cc713fc6abf');
const web3 = Web3Wallet.create(wallet, 'http://localhost:9545');

const contracts = require('./contracts')(web3, require('../build/abi.json'));
const events = require('./events');

(async () => {
  await events.listen(web3, contracts);
  return ;

  const erc721 = Object.values(contracts.swap721Tokens)[0];

  const oracleAddr = await erc721.oracle();
  const oracle = contracts.oracles[oracleAddr];

  const fixLegTokenAddr = await erc721.fixLegToken();
  const fixLegToken = contracts.erc20Tokens[fixLegTokenAddr];

  const collateralAddr = await erc721.floatingLegCollateral();
  const collateral = contracts.collaterals[collateralAddr];
  const floatingLegTokenAddr = await collateral.underlying();
  const floatingLegToken = contracts.erc20Tokens[floatingLegTokenAddr];

  console.log('Oracle:', oracle.address);
  console.log(fixLegTokenAddr, floatingLegTokenAddr);

  // await oracle.addWhitelisted(account);
  // await erc721.addWhitelisted(account);
  // await oracle.appendOracleData(Math.round(Date.now() / 1000 - 3600 * 24), 1e18);
  // await oracle.appendOracleData(Math.round(Date.now() / 1000 - 3600), 1e18);

  await fixLegToken.mint(account, 1e18);
  await floatingLegToken.mint(account, 1e18);
  await _.sleep(500);
  await floatingLegToken.approve(collateralAddr, 1e18);
  await _.sleep(500);
  await collateral.deposit(1e18);
  await _.sleep(500);
  await erc721.mint(24 * 3600 / 27, 27, 1e18, 1);
  await _.sleep(500);

  await fixLegToken.approve(erc721.address, 1e18);
  await _.sleep(500);
  await erc721.initialBuy([4]);

  for (let i = 0; i < 27; i++) {
    await _.sleep(1000);
    // should not throw, but there's some bug in web3.
    await erc721.settle([4]);
    console.log(web3.fromWei(await fixLegToken.balanceOf(account)));
    console.log(web3.fromWei(await floatingLegToken.balanceOf(account)));
    console.log(`Settle ${i + 1}/27`);
  }
})();
