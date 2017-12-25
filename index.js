let WebsiteType = require("./src/EnumType").WebsiteType;
let CityType = require("./src/EnumType").CityType;
let Sender = require("./src/Sender").Sender;
let Parser = require("./src/Parser").Parser;
let Utils = require("./src/Utils").Utils;
let fs = require("fs")


let main = async () => {
    let city = CityType.GuangZhou;
    let searchKey = Utils.GetUrlCode(".net");

    // let lagouBody = await Sender.LaGou(1, city, searchKey);
    // let lagouData = Parser.LaGou(lagouBody);

    // let zhilianBody = await Sender.ZhiLian(1, city, searchKey);
    // let zhilianData = await Parser.ZhiLian(zhilianBody);
    // console.log(zhilianData);

    // let liepin = await Sender.LiePin(1, city, searchKey);
    // console.log(liepin);

    // let qiancheng = await Sender.QianChengWuYou(1, city, searchKey);
    // console.log(qiancheng);

    // let boss = await Sender.BossZhiPin(1, city, searchKey);
    // console.log(boss);
};

main();
