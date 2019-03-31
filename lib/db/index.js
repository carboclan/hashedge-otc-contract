const _ = require('co-lodash');
const fs = require('fs');
const Sequelize = require('sequelize');

try {
  fs.mkdirSync(__dirname + '/../../data');
} catch (e) { }

const sequelize = new Sequelize('cache', null, null, {
  dialect: 'sqlite',
  storage: __dirname + '/../../data/cache.sqlite'
});


const models = fs.readdirSync(__dirname + '/models').map(f => {
  const def = require('./models/' + f);
  return [f.replace('.js', ''), def(sequelize, Sequelize)];
});

let ready = false;

module.exports = {
  sequelize,
  models: _.fromPairs(models),
  async init() {
    if (!ready) {
      await sequelize.authenticate();
      await sequelize.sync();

      ready = true;
    }
  }
};
