const _ = require('co-lodash');
const cs = require('co-stream');
const { Web3EventStream } = require('web3-stream');

const db = require('./db');
// const { Op } = db.sequelize;

const updateBlockNumber = _.throttle(async blockNumber => {
  await db.models.config.upsert({
    key: 'block_number',
    value: blockNumber.toString()
  });
}, 2000);

exports.listen = async function (web3, contracts) {
  await db.init();

  const blockNumberRes = await db.models.config.findOne({ where: { key: 'block_number' } });
  const fromBlock = process.env.FROM || (blockNumberRes && blockNumberRes.value * 1) || 0;

  function evtStream(evt) {
    return new Web3EventStream(web3, evt, {}, { fromBlock, to: 'latest' });
  }

  _.forEach(contracts.swap721Tokens, (swap721, contractAddr) => {
    async function getTokenDetail(tokenId) {
      const owner = await swap721.ownerOf(tokenId);
      const [terminated, issuer, contractSize, fixLegPayoutPerDay, startTime, endTime, lastSettleTime, margin, totalFixLegPaid, totalFloatingLegPaid] = await swap721.getTokenDetail(tokenId);

      let status = 0;
      if (terminated && startTime.valueOf() > 0) status = -1;
      else if (terminated) status = -2;
      else if (lastSettleTime.valueOf() === endTime.valueOf()) status = 2;
      else if (startTime > 0) status = 1;

      return {
        id: tokenId,
        status,
        owner,
        issuer,
        contractAddr,
        contractSize,
        fixLegPayoutPerDay,
        startTime: new Date(startTime.toNumber() * 1000),
        endTime: new Date(endTime.toNumber() * 1000),
        lastSettleTime: new Date(lastSettleTime.toNumber() * 1000),
        margin,
        totalFixLegPaid,
        totalFloatingLegPaid
      };
    }

    evtStream(swap721.Minted)
      .pipe(cs.object.each(async evt => {
        const { blockNumber, args, transactionHash } = evt;
        const { tokenId } = args;

        updateBlockNumber(blockNumber);
        const token = await getTokenDetail(tokenId);
        token.issueTx = transactionHash;
        token.price = Math.ceil(token.fixLegPayoutPerDay.toNumber() * (token.endTime.valueOf() - token.startTime.valueOf()) / (3600 * 1000 * 24));

        await db.models.swap721.upsert(token);
      }));

    evtStream(swap721.Bought)
      .pipe(cs.object.each(async evt => {
        const { blockNumber, args } = evt;
        const { tokenId } = args;

        updateBlockNumber(blockNumber);
        const token = await getTokenDetail(tokenId);
        // token.price = 0;

        await db.models.swap721.upsert(token);
      }));

    evtStream(swap721.Settled)
      .pipe(cs.object.each(async evt => {
        const { blockNumber, args } = evt;
        const { tokenId } = args;

        updateBlockNumber(blockNumber);
        const token = await getTokenDetail(tokenId);
        await db.models.swap721.upsert(token);
      }));

    evtStream(swap721.Terminated)
      .pipe(cs.object.each(async evt => {
        const { blockNumber, args } = evt;
        const { tokenId } = args;

        updateBlockNumber(blockNumber);
        const token = await getTokenDetail(tokenId);
        await db.models.swap721.upsert(token);
      }));

    evtStream(swap721.Canceled)
      .pipe(cs.object.each(async evt => {
        const { blockNumber, args } = evt;
        const { tokenId } = args;

        updateBlockNumber(blockNumber);
        const token = await getTokenDetail(tokenId);
        await db.models.swap721.upsert(token);
      }));
  });
};
