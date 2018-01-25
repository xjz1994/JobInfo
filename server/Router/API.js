let Cache = require("../Data/Cache").Cache;
let Sender = require("../Data/Sender").Sender;
let Parser = require("../Data/Parser").Parser;
let Utils = require("../Public/Utils").Utils;

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

        Cache.clear();

        let typeArr = Utils.ParsePowTwo(websiteType);

        let cacheData = [];
        for(let i in typeArr){
            let curType = typeArr[i];
            let d = Cache.get(page, cityType, searchKey, curType);
            if(d){
                cacheData = cacheData.concat(d);
                websiteType -= curType;
            }            
        }

        let res = await Sender.GetReqPromiseAll(page, cityType, searchKey, websiteType);
        let newData = Parser.ParseAllData(res);
        for(let i in newData){
            Cache.set(page, cityType, searchKey, i, newData[i]);
            cacheData = cacheData.concat(newData[i]);
        }        

        ctx.body = cacheData;
        next();
    }

    static async JobDetail(ctx, next) { }

    static async CompanyDetail(ctx, next) { }
}