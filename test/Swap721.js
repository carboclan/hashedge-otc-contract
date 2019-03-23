const Swap721 = artifacts.require('./tokens/Swap721.sol');
const ERC20 = artifacts.require('./tokens/TestERC20.sol');

contract('Swap721', async accounts => {
  let swap721, fixLegToken, floatingLegToken;

  async function deploy() {
    fixLegToken = await ERC20.new('FIX', 'FIX');
    floatingLegToken = await ERC20.new('FLOATING', 'FLT');
  }

  describe('test', function () {
    before(deploy);

    it('should have correct init state.', async () => {
      assert.equal(0, await fixLegToken.totalSupply());
      assert.equal(0, await floatingLegToken.totalSupply());

      const minted = web3.utils.toWei('1', 'ether');
      await fixLegToken.mint(accounts[1], minted);
      await floatingLegToken.mint(accounts[2], minted);
      assert.equal(minted, await fixLegToken.totalSupply());
      assert.equal(minted, await fixLegToken.balanceOf(accounts[1]));
      assert.equal(0, await fixLegToken.balanceOf(accounts[2]));
      assert.equal(minted, await floatingLegToken.totalSupply());
      assert.equal(0, await floatingLegToken.balanceOf(accounts[1]));
      assert.equal(minted, await floatingLegToken.balanceOf(accounts[2]));
    });
  });
});
