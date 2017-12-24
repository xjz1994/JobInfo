let WebsiteType = require("./src/EnumType").WebsiteType;
let CityType = require("./src/EnumType").CityType;
let Sender = require("./src/Sender").Sender;
let Utils = require("./src/Utils").Utils;


let main = async () => {
    let city = CityType.GuangZhou;
    let searchKey = Utils.GetUrlCode(".net");

    let lagou = await Sender.LaGou(1, city, searchKey);
    console.log(lagou);

    let zhilian = await Sender.ZhiLian(1, city, searchKey);
    console.log(zhilian);

    let liepin = await Sender.LiePin(1, city, searchKey);
    console.log(liepin);

    let qiancheng = await Sender.QianChengWuYou(1, city, searchKey);
    console.log(qiancheng);

    let boss = await Sender.BossZhiPin(1, city, searchKey);
    console.log(boss);
};

main();
