let Sender = require("../Data/Sender").Sender;
let Parser = require("../Data/Parser").Parser;

module.exports.API = class API {

    static InitAPI(router) {
        /**
         * 搜索列表
         * @param page 页码
         * @param cityType 城市类型
         * @param searchKey 搜索关键字
         * @param websiteType 网站类型
         * */
        router.get('/api/search', API.Search);


        router.get('api/jobDetail', API.JobDetail);
        router.get('api/companyDetail', API.CompanyDetail);
    }

    static async Search(ctx, next) {
        let page = ctx.query.page;
        let cityType = ctx.query.cityType;
        let searchKey = ctx.query.searchKey;
        let websiteType = ctx.query.websiteType;

        let res = await Sender.GetReqPromiseAll(page, cityType, searchKey, websiteType);
        let data = Parser.ParseAllData(res);
        ctx.body = data;
        next();
    }

    static async JobDetail(ctx, next) { }

    static CompanyDetail(ctx, next) { }
}