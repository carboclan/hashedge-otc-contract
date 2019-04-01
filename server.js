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
        const path = '/' + f.replace(/.js$/g, '') + '/' + fn;
        app.use(route[method](path, module[method][fn]));
      })
    });
  }
});

require('./lib/db').init().then(() => {
  console.log('App is listening on 3000.');
  app.listen(3000);
});
