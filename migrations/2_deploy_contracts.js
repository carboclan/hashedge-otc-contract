const ERC20 = artifacts.require('./tokens/TestERC20.sol');
const Collateral = artifacts.require('./tokens/Collateral.sol');
const Oracle = artifacts.require('./tokens/Oracle.sol');
const Swap721 = artifacts.require('./tokens/Swap721.sol');

module.exports = async function(deployer) {
  deployer.then(async () => {
    if (process.env.PROD !== true) {
      await deployer.deploy(ERC20, 'FIX', 'FIX');
      const fixLegToken = await ERC20.deployed();

      await deployer.deploy(ERC20, 'FLOATING', 'FLT');
      const floatingLegToken = await ERC20.deployed();

      await deployer.deploy(Collateral, floatingLegToken.address);
      const collateral = await Collateral.deployed();

      await deployer.deploy(Oracle);
      const oracle = await Oracle.deployed();

      await deployer.deploy(Swap721, 'SWAP TEST', 'SWT', 'TH/s', 'PoW', oracle.address, fixLegToken.address, collateral.address);
      const swap721 = await Swap721.deployed();

      await collateral.addWhitelisted(swap721.address);

      const output = {
        erc20Tokens: {
          [fixLegToken.address.toLowerCase()]: fixLegToken.abi,
          [floatingLegToken.address.toLowerCase()]: floatingLegToken.abi
        },
        collaterals: {
          [collateral.address.toLowerCase()]: collateral.abi
        },
        oracles: {
          [oracle.address.toLowerCase()]: oracle.abi
        },
        swap721Tokens: {
          [swap721.address.toLowerCase()]: swap721.abi
        }
      };

      require('fs').writeFileSync(__dirname + '/../build/abi.json', JSON.stringify(output));
    }
  });
};
