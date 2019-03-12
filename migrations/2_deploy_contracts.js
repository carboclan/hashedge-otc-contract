const BtcSwapToken = artifacts.require('./tokens/BtcSwapToken.sol');

module.exports = async function(deployer) {
  deployer.then(async () => {
    await deployer.deploy(BtcSwapToken);
  });
};
