let request = require('request');
let HttpMoth = require("../Public/EnumType").HttpMoth;
let WebsiteType = require("../Public/EnumType").WebsiteType;
let CityType = require("../Public/EnumType").CityType;
let Utils = require("../Public/Utils").Utils;

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
        let option = {
            url: `https://www.lagou.com/jobs/positionAjax.json?city=${searchCity}&needAddtionalResult=false&isSchoolJob=0`,
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
        let option = {
            url: `https://sou.zhaopin.com/jobs/searchresult.ashx?jl=${searchCity}&kw=${searchKey}&p=${page}`,
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
        return this.Request(HttpMoth.GET, option, WebsiteType.ZhiLian);
    }

    /**
     * 猎聘网
     */
    static LiePin(page, searchCity, searchKey) {
        let option = {
            url: `https://www.liepin.com/zhaopin/?dqs=${searchCity}searchType=1&&init=1&sortFlag=15&d_curPage=${page}&d_pageSize=40&key=${searchKey}`
        };
        return this.Request(HttpMoth.GET, option, WebsiteType.LiePin);
    }

    /**
     * 前程无忧
     */
    static QianChengWuYou(page, searchCity, searchKey) {
        let option = {
            url: `http://search.51job.com/jobsearch/search_result.php?jobarea=${searchCity}&keyword=${searchKey}&curr_page=${page}`,
            encoding: null
        };
        return this.Request(HttpMoth.GET, option, WebsiteType.QianChengWuYou);
    }

    /**
     * BOSS直聘
     */
    static BossZhiPin(page, searchCity, searchKey) {
        let option = {
            url: `http://www.zhipin.com/c${searchCity}/h_${searchCity}/?query=${searchKey}&page=${page}`,
        };
        return this.Request(HttpMoth.GET, option, WebsiteType.BossZhiPin);
    }

    /**
     * 根据类型，获取相应的Promise对象
     */
    static GetReqPromise(page, searchCity, searchKey, type) {
        searchCity = Utils.GetCityUrlCode(type, searchCity);
        let keyCode = Utils.GetUrlCode(searchKey);
        switch (type) {
            case WebsiteType.LaGou:
                return this.LaGou(page, searchCity, searchKey);
            case WebsiteType.ZhiLian:
                return this.ZhiLian(page, searchCity, keyCode);
            case WebsiteType.QianChengWuYou:
                return this.QianChengWuYou(page, searchCity, keyCode);
            case WebsiteType.LiePin:
                return this.LiePin(page, searchCity, keyCode);
            case WebsiteType.BossZhiPin:
                return this.BossZhiPin(page, searchCity, keyCode);
        }
    }

    /**
     * 解析类型，获取Promise.all
     */
    static GetReqPromiseAll(page, searchCity, searchKey, websiteType) {
        let promiseArr = [];
        let typeArr = Utils.ParsePowTwo(websiteType);
        for (let i in typeArr) {
            promiseArr.push(this.GetReqPromise(page, searchCity, searchKey, typeArr[i]));
        }
        return Promise.all(promiseArr);
    }
}