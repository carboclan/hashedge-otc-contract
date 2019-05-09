const ERC20 = artifacts.require('./tokens/TestERC20.sol');
const Collateral = artifacts.require('./tokens/Collateral.sol');
const Oracle = artifacts.require('./tokens/Oracle.sol');
const Swap721 = artifacts.require('./tokens/Swap721.sol');

module.exports = async function(deployer, network, accounts) {
  deployer.then(async () => {
    if (process.env.PROD !== true) {
      await deployer.deploy(ERC20, 'DAI', 'DAI');
      const dai = await ERC20.deployed();

      await deployer.deploy(ERC20, 'WBTC', 'WBTC');
      const wbtc = await ERC20.deployed();

      await deployer.deploy(ERC20, 'WETH', 'WETH');
      const weth = await ERC20.deployed();

      await deployer.deploy(Collateral, wbtc.address);
      const btcCollateral = await Collateral.deployed();

      await deployer.deploy(Collateral, weth.address);
      const ethCollateral = await Collateral.deployed();

      await deployer.deploy(Oracle);
      const oracleBtc = await Oracle.deployed();

      await deployer.deploy(Oracle);
      const oracleEth = await Oracle.deployed();

      await deployer.deploy(Swap721, 'BTC-POW', 'BTC-POW', 'TH/s', 'PoW', oracleBtc.address, dai.address, btcCollateral.address);
      const btcSwap721 = await Swap721.deployed();

      await deployer.deploy(Swap721, 'ETH-POW', 'ETH-POW', 'GH/s', 'PoW', oracleEth.address, dai.address, ethCollateral.address);
      const ethSwap721 = await Swap721.deployed();

      await btcCollateral.addWhitelisted(btcSwap721.address);
      await ethCollateral.addWhitelisted(ethSwap721.address);

      await oracleBtc.addWhitelisted(accounts[0]);
      await oracleEth.addWhitelisted(accounts[0]);

      await btcSwap721.addWhitelisted(accounts[0]);
      await ethSwap721.addWhitelisted(accounts[0]);

      await dai.mint(accounts[0], 1e19.toString());
      await wbtc.mint(accounts[0], 1e19.toString());
      await weth.mint(accounts[0], 1e19.toString());

      await oracleBtc.appendOracleData(Math.round(Date.now() / 1000 - 3600 * 24), (0.00003970 * 1e18).toString());
      await oracleEth.appendOracleData(Math.round(Date.now() / 1000 - 3600 * 24), ( 0.00008914  * 1e18).toString());

      await wbtc.approve(btcCollateral.address, 2e18.toString());
      await btcCollateral.deposit(2e18.toString());
      await btcSwap721.mint(24 * 3600 / 27, 27, 1e18.toString(), 2);

      await dai.approve(btcSwap721.address, 1e18.toString());
      try { await btcSwap721.initialBuy([0]); }
      catch (e) { }

      await weth.approve(ethCollateral.address, 2e18.toString());
      await ethCollateral.deposit(2e18.toString());
      await ethSwap721.mint(24 * 3600 / 27, 27, 1e18.toString(), 2);

      const output = {
        erc20Tokens: {
          [dai.address.toLowerCase()]: dai.abi,
          [wbtc.address.toLowerCase()]: wbtc.abi,
          [weth.address.toLowerCase()]: weth.abi
        },
        collaterals: {
          [btcCollateral.address.toLowerCase()]: btcCollateral.abi,
          [ethCollateral.address.toLowerCase()]: ethCollateral.abi
        },
        oracles: {
          [oracleBtc.address.toLowerCase()]: oracleBtc.abi,
          [oracleEth.address.toLowerCase()]: oracleEth.abi
        },
        swap721Tokens: {
          [btcSwap721.address.toLowerCase()]: btcSwap721.abi,
          [ethSwap721.address.toLowerCase()]: ethSwap721.abi
        }
      };

      require('fs').writeFileSync(__dirname + '/../build/abi.json', JSON.stringify(output));
    }
  });
};
