let WebsiteType = require("./src/EnumType").WebsiteType;
let CityType = require("./src/EnumType").CityType;
let Sender = require("./src/Sender").Sender;
let Utils = require("./src/Utils").Utils;
let fs = require("fs");


let main = async () => {
    let city = CityType.GuangZhou;
    let searchKey = Utils.GetUrlCode(".net");

    let lagouBody = await Sender.LaGou(1, city, searchKey);
    let lagouData = Parser.LaGou(lagouBody);

    let qiancheng = await Sender.QianChengWuYou(1, city, searchKey);
    let qianChengData = await Parser.QianChengWuYou(qiancheng);

    let zhilianBody = await Sender.ZhiLian(1, city, searchKey);
    let zhilianData = await Parser.ZhiLian(zhilianBody);

    let liepin = await Sender.LiePin(1, city, searchKey);
    let liepinData = await Parser.LiePin(liepin);

    let boss = await Sender.BossZhiPin(1, city, searchKey);
    let bossData = await Parser.BossZhiPin(boss);

    let positionData = lagouData.concat(zhilianData).concat(qianChengData).concat(liepinData).concat(bossData);
    console.log(positionData);
};

main();
