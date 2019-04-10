const fs = require('fs');
const Koa = require('koa');
const json = require('koa-json');
const route = require('koa-route');

const app = new Koa();
app.use(json());

const files = fs.readdirSync(__dirname + '/lib/routes');
files.forEach(f => {
  if (f.endsWith('.js')) {
    const module = require(__dirname + '/lib/routes/' + f);

    ['get', 'post', 'delete', 'put', 'all'].forEach(method => {
      module[method] && Object.keys(module[method]).forEach(fn => {
        const path = '/api/' + f.replace(/.js$/g, '') + '/' + fn;
        app.use(route[method](path, module[method][fn]));
      })
    });
  }
});

const Web3Wallet = require('web3-wallet');

const wallet = Web3Wallet.wallet.generate();
const web3 = Web3Wallet.create(wallet, process.env.URL || 'http://localhost:9545');

const contracts = require('./lib/contracts')(web3, require('./build/abi.json'));
const events = require('./lib/events');

(async () => {
  await events.listen(web3, contracts);

  for (const swap721 of Object.values(contracts.swap721Tokens)) {
    swap721.name = await swap721.name();
    swap721.symbol = await swap721.symbol();
    swap721.contractType = await swap721.contractType();
    swap721.contractUnit = await swap721.contractUnit();
  }

  global.contracts = contracts;

  console.log('App is listening on 3000.');
  app.listen(3000);
})().catch(console.error);
