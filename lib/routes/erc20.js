const axios = require('axios');
const binance = require('node-binance-api')().options({
  APIKEY: '<key>',
  APISECRET: '<secret>',
  useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});

const info = [
  {
    name: 'Bitcoin',
    code: 'BTC',
    difficulty: '',
    hashType: 'POW',
    usdPayoff: 0,
    unit: 'TH',
    coinPayoff: 0,
    profitRate: -0.147,
    dailyPerformance: -0.005,
    dailyNetGain: -0.002,
    monthlyPerformance: -0.16,
    monthlyNetGain: -0.08
  },
  {
    name: 'Ether',
    code: 'ETH',
    difficulty: '',
    hashType: 'POW',
    usdPayoff: 0,
    unit: 'GH',
    coinPayoff: 0,
    profitRate: -1.767,
    dailyPerformance: -0.004,
    dailyNetGain: -0.003,
    monthlyPerformance: -0.19,
    monthlyNetGain: -0.05
  },
  {
    disabled: true,
    name: 'ZCASH',
    code: 'ZEC',
    difficulty: '',
    hashType: 'POW',
    usdPayoff: 0,
    unit: 'KSOL',
    coinPayoff: 0,
    profitRate: 4.357,
    dailyPerformance: -0.001,
    dailyNetGain: -0.002,
    monthlyPerformance: 0.04,
    monthlyNetGain: 0.03
  },
  {
    disabled: true,
    name: 'LiteCoin',
    code: 'LTC',
    difficulty: '',
    hashType: 'POW',
    usdPayoff: 0,
    unit: 'GH',
    coinPayoff: 0,
    profitRate: -0.204,
    dailyPerformance: -0.004,
    dailyNetGain: -0.0005,
    monthlyPerformance: 0.11,
    monthlyNetGain: 0.05
  },
  {
    disabled: true,
    name: 'TEZOS',
    code: 'XZT',
    difficulty: 'N/A',
    hashType: 'POS',
    usdPayoff: -0.002309351417 * 1e18,
    unit: 'XZT',
    coinPayoff: -0.082028210 * 1e18,
    profitRate: -0.513,
    dailyPerformance: -0.005,
    dailyNetGain: -0.002,
    monthlyPerformance: -0.01,
    monthlyNetGain: -0.01
  },
  {
    disabled: true,
    name: 'EOS',
    code: 'EOS',
    difficulty: 'N/A',
    hashType: 'DPOS',
    usdPayoff: 0,
    unit: 'EOS',
    coinPayoff: 0.0000273973 * 1e18 ,
    profitRate: 15.258,
    dailyPerformance: 0.004,
    dailyNetGain: 0.003,
    monthlyPerformance: 0.17,
    monthlyNetGain: 0.1
  }
];

function updatePrice() {
  binance.prices((err, tickers) => {
    if (!err && tickers) {
      info.forEach(v => {
        const price = tickers[v.code + 'USDT'] * 1;
        if (price) {
          v.exchangePrice = price;
          v.usdPayoff = v.coinPayoff * price;
        }

        v.priceCOIN = v.coinPayoff;
        v.priceUSD = v.usdPayoff
      });
    }
  });
}

const unitFactors = {
  'T': 1,
  'G': 1000,
  'M': 1000 ** 2,
  'K': 1000 ** 3
};

async function updateMining() {
  const res = await axios.get('https://www.coincalculators.io/api?hashrate=1000000000000');
  const { data } = res;

  data.forEach(item => {
    const coin = info.find(i => i.code.toLowerCase() === item.symbol.toLowerCase());
    if (coin) {
      const factor = unitFactors[coin.unit[0]];
      coin.difficulty = item.currentDifficulty;
      coin.coinPayoff = Math.round(item.rewardsInDay / factor * 1e18);
      if (coin.exchangePrice) coin.usdPayoff = coin.coinPayoff * coin.exchangePrice;
    }
  });
}

updatePrice();
setInterval(updatePrice, 60 * 1000);

updateMining();
setInterval(updateMining, 60 * 60 * 1000);

module.exports = {
  get: {
    async info(ctx) {
      ctx.body = info;
    }
  }
};
