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
    16: "前程无忧",
    32: "BOSS直聘"
}

module.exports.CityType = {
    //China: "China",
    BeiJing: 2,
    ShangHai: 4,
    GuangZhou: 8,
    ShenZhen: 32,
    // TianJin: "TianJin",
    // SuZhou: "SuZhou",
    // ChongQing: "ChongQing",
    // NanJing: "NanJing",
    // HangZhou: "HangZhou",
    // DaLian: "DaLian",
    // ChengDu: "ChengDu",
    // WuHan: "WuHan",
}

module.exports.CityStr = {
    //China: { liePin: "", chinese: "全国" },
    2: { chinese: "北京", liePin: "010", qianCheng: "010000", boss: "101010100" },
    4: { chinese: "上海", liePin: "020", qianCheng: "020000", boss: "101020100" },
    8: { chinese: "广州", liePin: "050020", qianCheng: "030200", boss: "101280100" },
    32: { chinese: "深圳", liePin: "050090", qianCheng: "040000", boss: "101280600" },
    // TianJin: { code: "030", chinese: "天津" },
    // SuZhou: { code: "060080", chinese: "苏州" },
    // ChongQing: { code: "040", chinese: "重庆" },
    // NanJing: { code: "060020", chinese: "南京" },
    // HangZhou: { code: "070020", chinese: "杭州" },
    // DaLian: { code: "210040", chinese: "大连" },
    // ChengDu: { code: "280020", chinese: "成都" },
    // WuHan: { code: "170020", chinese: "武汉" },
}