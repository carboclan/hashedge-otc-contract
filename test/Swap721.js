const ERC20 = artifacts.require('./tokens/TestERC20.sol');
const Collateral = artifacts.require('./tokens/Collateral.sol');
const Oracle = artifacts.require('./tokens/Oracle.sol');
const Swap721 = artifacts.require('./tokens/Swap721.sol');

const _ = require('co-lodash');
const shouldThrow = require('./shouldThrow');

contract('Swap721', async accounts => {
  let collateral, oracle, swap721, fixLegToken, floatingLegToken;

  async function deploy() {
    fixLegToken = await ERC20.new('FIX', 'FIX');

    floatingLegToken = await ERC20.new('FLOATING', 'FLT');
    collateral = await Collateral.new(floatingLegToken.address);
    oracle = await Oracle.new();

    swap721 = await Swap721.new('SWAP TEST', 'SWT', 'TH/s', 'PoW', oracle.address, fixLegToken.address, collateral.address);
    await collateral.addWhitelisted(swap721.address);
    await oracle.addWhitelisted(accounts[0]);

    await swap721.addWhitelisted(accounts[2]);
  }

  describe('test', function () {
    before(deploy);

    it('should have correct init state.', async () => {
      assert.equal(0, await fixLegToken.totalSupply());
      assert.equal(0, await floatingLegToken.totalSupply());
      assert(await collateral.isWhitelisted(swap721.address));
      assert(await oracle.isWhitelisted(accounts[0]));
      assert(await swap721.isWhitelisted(accounts[2]));
    });

    const minted = web3.utils.toWei('1', 'ether');

    it('should have correct collateral.', async () => {
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

    it('should not work before oracle is ready', async () => {
      await shouldThrow(swap721.mint(1, 24 * 3600, minted, 1, { from: accounts[2] }));
    });

    it('should work as expected.', async () => {
      await oracle.appendOracleData(Math.round(Date.now() / 1000 - 3600 * 24), minted);
      await oracle.appendOracleData(Math.round(Date.now() / 1000 - 3600), minted);

      assert.equal(0, await collateral.marginOf(accounts[2]));
      await swap721.mint(24 * 3600 / 27, 27, minted, 1, { from: accounts[2] });
      assert.equal(minted, await collateral.marginOf(accounts[2]));

      await fixLegToken.approve(swap721.address, minted, { from: accounts[1] });
      // should not throw, but there's some bug in web3.
      await shouldThrow(swap721.initialBuy([0], { from: accounts[1] }));

      for (let i = 0; i < 27; i++) {
        await _.sleep(1000);
        // should not throw, but there's some bug in web3.
        await shouldThrow(swap721.settle([0]));
        console.log(web3.utils.fromWei(await fixLegToken.balanceOf(accounts[2])));
        console.log(web3.utils.fromWei(await floatingLegToken.balanceOf(accounts[1])));
        console.log(`Settle ${i + 1}/27`);
      }
    });
  });
});
