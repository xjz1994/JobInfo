let CityType = require("./server/EnumType").CityType;
let WebsiteType = require("./server/EnumType").WebsiteType;
let Sender = require("./server/Sender").Sender;
let Parser = require("./server/Parser").Parser;
let Utils = require("./server/Utils").Utils;

// const Koa = require('koa');
// const serve = require('koa-static');
// const Router = require('koa-router');
// const cors = require('koa2-cors');

// const app = new Koa();
// const router = new Router();

// router.get('/api/search', async (ctx, next) => {
//     let page = ctx.query.page;
//     let city = ctx.query.cityType;
//     let searchKey = ctx.query.searchKey;
//     let websiteType = ctx.query.websiteType;

//     let res = await Sender.GetReqPromiseAll(page, city, searchKey, websiteType);
//     let data = await Parser.ParseAllData(res);
//     ctx.body = data;
//     next();
// });

// app.use(cors());
// app
//     .use(router.routes())
//     .use(router.allowedMethods())
//     .use(serve(`${__dirname}/client/build`));

// app.listen(3001);



let main = async () => {
    let page = 1;
    let city = CityType.GuangZhou;
    let searchKey = Utils.GetUrlCode(".net");
    let websiteType = 16;
    let res = await Sender.GetReqPromiseAll(page, city, searchKey, websiteType);
    let data = Parser.ParseAllData(res);
}
main();

// //cheerio demo
// let $ = cheerio.load(body);
// let tbody = $('tbody,.rowlink');
// let trs = $('tr', tbody);
// for (let i = 0; i < trs.length; i++) {
//     let curData = {};
//     let item = trs[i];
//     curData.language = $('td,.table-language', item);
//     curData.star = $('td,.table-change', item).text();
//     curData.href = $('a', item).data();
//     data.push(curData);
// }
// console.log(data);