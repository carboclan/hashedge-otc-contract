const BtcSwap721 = artifacts.require('./tokens/Swap721.sol');

module.exports = async function(deployer) {
  deployer.then(async () => {
    await deployer.deploy(BtcSwap721);
  });
};
