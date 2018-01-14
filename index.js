const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const cors = require('koa2-cors');
const API = require("./server/Router/API").API;

const app = new Koa();
const router = new Router();

API.InitAPI(router);

app.use(cors());
app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(`${__dirname}/client/build`));

app.listen(3001);