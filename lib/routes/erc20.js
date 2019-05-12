const binance = require('node-binance-api')().options({
  APIKEY: '<key>',
  APISECRET: '<secret>',
  useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});

const info = [
  {
    name: 'Bitcoin',
    code: 'BTC',
    hashType: 'POW',
    priceUSD: 0,
    unit: 'TH',
    priceCOIN: 0.00004101 * 1e18,
    profitRate: 0.147
  },
  {
    name: 'Ether',
    code: 'ETH',
    hashType: 'POW',
    priceUSD: 0,
    unit: 'GH',
    priceCOIN: 0.00001281 * 1e18,
    profitRate: 1.767
  },
  {
    name: 'ZCASH',
    code: 'ZEC',
    hashType: 'POW',
    priceUSD: 0,
    unit: 'KSOL',
    priceCOIN: 0.082028210 * 1e18,
    profitRate: 4.357
  },
  {
    name: 'LiteCoin',
    code: 'LTC',
    hashType: 'POW',
    priceUSD: 0,
    unit: 'MH',
    priceCOIN: 0.000028210 * 1e18,
    profitRate: -0.204
  },
  {
    name: 'TEZOS',
    code: 'XZT',
    hashType: 'POS',
    priceUSD: -0.002309351417 * 1e18,
    unit: 'XZT',
    priceCOIN: -0.082028210 * 1e18,
    profitRate: -0.513
  },
  {
    name: 'EOS',
    code: 'EOS',
    hashType: 'DPOS',
    priceUSD: 0,
    unit: 'EOS',
    priceCOIN: 0.0000273973 * 1e18 ,
    profitRate: 15.258
  }
];

function updateInfo() {
  binance.prices((err, tickers) => {
    if (!err && tickers) {
      info.forEach(v => {
        const price = tickers[v.code + 'USDT'] * 1;
        if (price) {
          v.exchangePrice = price;
          v.priceUSD = v.priceCOIN * price;
        }
      });
    }
  });
}

updateInfo();
setInterval(updateInfo, 60 * 1000);

module.exports = {
  get: {
    async info(ctx) {
      ctx.body = info;
    }
  }
};
