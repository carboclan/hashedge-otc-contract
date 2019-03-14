const BtcSwapToken = artifacts.require('./tokens/BtcSwapToken.sol');

module.exports = async function(deployer) {
  deployer.then(async () => {
    await deployer.deploy(BtcSwapToken, "0x0", "0x0");
  });
};
