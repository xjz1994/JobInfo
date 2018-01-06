let CityType = require("./server/EnumType").CityType;
let Sender = require("./server/Sender").Sender;
let Parser = require("./server/Parser").Parser;
let Utils = require("./server/Utils").Utils;

const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/api/search', async (ctx, next) => {
    let page = 1;
    let city = CityType.GuangZhou;
    let searchKey = Utils.GetUrlCode(".net");

    let type = 2 + 4;
    let t = new Date().getTime();
    let res = await Sender.GetReqPromiseAll(page, city, searchKey, type);
    let data = await Parser.ParseAllData(res);
    ctx.body = data;
    next();
});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(`${__dirname}/client/build`));

app.listen(3000);