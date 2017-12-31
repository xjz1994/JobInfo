// let WebsiteType = require("./server/EnumType").WebsiteType;
// let CityType = require("./server/EnumType").CityType;
// let Sender = require("./server/Sender").Sender;
// let Parser = require("./server/Parser").Parser;
// let Utils = require("./server/Utils").Utils;
// let fs = require("fs");

// let main = async () => {
//     let city = CityType.GuangZhou;
//     let searchKey = Utils.GetUrlCode(".net");
//     let t1 = new Date().getTime();

//     let lagouBody = await Sender.LaGou(1, city, searchKey);
//     let lagouData = Parser.LaGou(lagouBody);

//     let qiancheng = await Sender.QianChengWuYou(1, city, searchKey);
//     let qianChengData = await Parser.QianChengWuYou(qiancheng);

//     let zhilianBody = await Sender.ZhiLian(1, city, searchKey);
//     let zhilianData = await Parser.ZhiLian(zhilianBody);

//     let liepin = await Sender.LiePin(1, city, searchKey);
//     let liepinData = await Parser.LiePin(liepin);

//     let boss = await Sender.BossZhiPin(1, city, searchKey);
//     let bossData = await Parser.BossZhiPin(boss);

//     let positionData = lagouData.concat(zhilianData).concat(qianChengData).concat(liepinData).concat(bossData);

//     let t2 = new Date().getTime();

//     console.log(t2 - t1)
//     console.log(positionData);
// };

// main();

const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('api/search', async (ctx, next) => {
    ctx.body = "search result";
});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(serve(`${__dirname}/client/build`));

app.listen(3000);