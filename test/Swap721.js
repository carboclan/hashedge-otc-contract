const ERC20 = artifacts.require('./tokens/TestERC20.sol');
const Collateral = artifacts.require('./tokens/Collateral.sol');
const Oracle = artifacts.require('./tokens/Oracle.sol');
const Swap721 = artifacts.require('./tokens/Swap721.sol');

contract('Swap721', async accounts => {
  let collateral, oracle, swap721, fixLegToken, floatingLegToken;

  async function deploy() {
    fixLegToken = await ERC20.new('FIX', 'FIX');

    floatingLegToken = await ERC20.new('FLOATING', 'FLT');
    collateral = await Collateral.new(floatingLegToken.address);
    oracle = await Oracle.new();

    swap721 = await Swap721.new('SWAP TEST', 'SWT', 'TH/s', 'PoW', oracle.address, fixLegToken.address, collateral.address);
  }

  describe('test', function () {
    before(deploy);

    it('should have correct init state.', async () => {
      assert.equal(0, await fixLegToken.totalSupply());
      assert.equal(0, await floatingLegToken.totalSupply());
    });

    it('should have correct collateral.', async () => {
      const minted = web3.utils.toWei('1', 'ether');
      await fixLegToken.mint(accounts[1], minted);
      await floatingLegToken.mint(accounts[2], minted);
      assert.equal(minted, await fixLegToken.totalSupply());
      assert.equal(minted, await fixLegToken.balanceOf(accounts[1]));
      assert.equal(0, await fixLegToken.balanceOf(accounts[2]));
      assert.equal(minted, await floatingLegToken.totalSupply());
      assert.equal(0, await floatingLegToken.balanceOf(accounts[1]));
      assert.equal(minted, await floatingLegToken.balanceOf(accounts[2]));

      assert.equal(0, await collateral.balanceOf(accounts[2]));
      await floatingLegToken.approve(collateral.address, minted, { from: accounts[2] });
      await collateral.deposit(minted, { from: accounts[2] });
      assert.equal(minted, await collateral.balanceOf(accounts[2]));
    });
  });
});
