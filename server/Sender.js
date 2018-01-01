let request = require('request');
let Utils = require("./Utils").Utils;
let HttpMoth = require("./EnumType").HttpMoth;
let WebsiteType = require("./EnumType").WebsiteType;
let CityType = require("./EnumType").CityType;

module.exports.Sender = class Sender {

    static Request(moth, option, type) {
        let func = moth == HttpMoth.GET ? request.get : request.post;
        return new Promise((resolve, reject) => {
            func(option, (err, httpResponse, body) => {
                if (err) reject(err);
                let data = { body: body, type: type };
                resolve(data);
            });
        });
    }

    /**
     * 拉勾网
     */
    static LaGou(page, searchCity, searchKey) {
        let city = Utils.GetCityUrlCode(WebsiteType.LaGou, searchCity);
        let option = {
            url: `https://www.lagou.com/jobs/positionAjax.json?city=${city}&needAddtionalResult=false&isSchoolJob=0`,
            form: {
                first: false,
                pn: page,
                kd: searchKey
            },
            //拉勾网后台会检测UA、Referer、X-Requested-With
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://www.lagou.com/jobs/list_.net',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
        return this.Request(HttpMoth.POST, option, WebsiteType.LaGou);
    }

    /**
     * 智联网
     */
    static ZhiLian(page, searchCity, searchKey) {
        let city = Utils.GetCityUrlCode(WebsiteType.ZhiLian, searchCity);
        let option = {
            url: `https://sou.zhaopin.com/jobs/searchresult.ashx?jl=${city}&kw=${searchKey}&p=${page}`
        };
        return this.Request(HttpMoth.GET, option, WebsiteType.ZhiLian);
    }

    /**
     * 猎聘网
     */
    static LiePin(page, searchCity, searchKey) {
        let city = Utils.GetCityUrlCode(WebsiteType.LiePin, searchCity);
        let option = {
            url: `https://www.liepin.com/zhaopin/?dqs=${city}searchType=1&&init=1&sortFlag=15&d_curPage=${page}&d_pageSize=40&key=${searchKey}`
        };
        return this.Request(HttpMoth.GET, option, WebsiteType.LiePin);
    }

    /**
     * 前程无忧
     */
    static QianChengWuYou(page, searchCity, searchKey) {
        let city = Utils.GetCityUrlCode(WebsiteType.QianChengWuYou, searchCity);
        let option = {
            url: `http://search.51job.com/jobsearch/search_result.php?jobarea=${city}&keyword=${searchKey}&curr_page=${page}`,
            encoding: null
        };
        return this.Request(HttpMoth.GET, option, WebsiteType.QianChengWuYou);
    }

    /**
     * BOSS直聘
     */
    static BossZhiPin(page, searchCity, searchKey) {
        let city = Utils.GetCityUrlCode(WebsiteType.BossZhiPin, searchCity);
        let option = {
            url: `http://www.zhipin.com/c${city}/h_${city}/?query=${searchKey}&page=${page}`,
        };
        return this.Request(HttpMoth.GET, option, WebsiteType.BossZhiPin);
    }

    /**
     * 根据类型，获取相应的Promise对象
     */
    static GetReqPromise(page, searchCity, searchKey, type) {
        switch (type) {
            case WebsiteType.LaGou:
                return this.LaGou(page, searchCity, searchKey);
            case WebsiteType.ZhiLian:
                return this.ZhiLian(page, searchCity, searchKey);
            case WebsiteType.QianChengWuYou:
                return this.QianChengWuYou(page, searchCity, searchKey);
            case WebsiteType.LiePin:
                return this.LiePin(page, searchCity, searchKey);
            case WebsiteType.BossZhiPin:
                return this.BossZhiPin(page, searchCity, searchKey);
        }
    }

    /**
     * 解析类型，获取Promise.all
     */
    static GetReqPromiseAll(page, searchCity, searchKey, type) {
        let promiseArr = [];
        let typeArr = Utils.ParsePowTwo(type);
        for (let i in typeArr) {
            promiseArr.push(this.GetReqPromise(page, searchCity, searchKey, typeArr[i]));
        }
        return Promise.all(promiseArr);
    }
}