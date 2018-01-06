module.exports.HttpMoth = {
    GET: "GET",
    POST: "POST"
}

module.exports.WebsiteType = {
    LaGou: 2,
    ZhiLian: 4,
    LiePin: 8,
    QianChengWuYou: 32,
    BossZhiPin: 64,
}

module.exports.WebsiteStr = {
    2: "拉勾",
    4: "智联",
    8: "猎聘",
    32: "前程无忧",
    64: "BOSS直聘"
}

module.exports.CityType = {
    //China: "China",
    BeiJing: 2,
    ShangHai: 4,
    GuangZhou: 8,
    ShenZhen: 32,
}

module.exports.CityStr = {
    2: { chinese: "北京", liePin: "010", qianCheng: "010000", boss: "101010100" },
    4: { chinese: "上海", liePin: "020", qianCheng: "020000", boss: "101020100" },
    8: { chinese: "广州", liePin: "050020", qianCheng: "030200", boss: "101280100" },
    32: { chinese: "深圳", liePin: "050090", qianCheng: "040000", boss: "101280600" },
}