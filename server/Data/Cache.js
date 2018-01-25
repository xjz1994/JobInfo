let Utils = require('../Public/Utils').Utils;

class Cache {

    static getLastCacheTime() {
        let curTime = Utils.GetUnixTimestamp();                                 //当前时间
        let zeroTime = Utils.getZerohour(curTime);                              //当天0点时间
        let cycle = Math.floor((curTime - zeroTime) / Cache.CACHE_EXIT_TIME);   //缓存周期次数
        let lastCacheTime = zeroTime + cycle * Cache.CACHE_EXIT_TIME;           //上一次缓存时间
        return lastCacheTime;
    }

    static set(page, cityType, searchKey, websiteType, data) {
        let lastCacheTime = Cache.getLastCacheTime();
        let cacheData = Cache.CacheData[lastCacheTime];
        if (!cacheData) {
            Cache.CacheData[lastCacheTime] = cacheData = {};            
        }

        let searchKeyData = cacheData[searchKey];
        if (!searchKeyData) {
            cacheData[searchKey] = searchKeyData = {};
        }
        searchKeyData[`${cityType}_${websiteType}_${page}`] = data;
    }

    static get(page, cityType, searchKey, websiteType) {
        let lastCacheTime = Cache.getLastCacheTime();
        let cacheData = Cache.CacheData[lastCacheTime];
        if (!cacheData) {
            return null;
        }
        //考虑加上Edit Distance算法
        let searchKeyData = cacheData[searchKey];
        let data = searchKeyData[`${cityType}_${websiteType}_${page}`];
        return data;
    }

    static clear() {
        let lastCacheTime = Cache.getLastCacheTime();
        for (let i in Cache.CacheData) {
            if (i != lastCacheTime) {
                CacheData.CacheData[i] = null;
            }
        }
    }
}

Cache.CACHE_EXIT_TIME = 60 * 30;        //缓存持续时间 30分钟
Cache.CacheData = {};

module.exports.Cache = Cache;