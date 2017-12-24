let request = require('request');
let iconv = require('iconv-lite');
let Utils = require("./Utils").Utils;
let HttpMoth = require("./EnumType").HttpMoth;
let WebsiteType = require("./EnumType").WebsiteType;
let CityType = require("./EnumType").CityType;

module.exports.Sender = class Sender {
    static Request(moth, option) {
        let func = moth == HttpMoth.GET ? request.get : request.post;
        return new Promise((resolve, reject) => {
            func(option, (err, httpResponse, body) => {
                if (err) reject(err);
                resolve(body);
            });
        });
    }

    /**
     * 拉勾网
     */
    static async LaGou(page, searchCity, searchKey) {
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
        let result = await this.Request(HttpMoth.POST, option);
        return result;
    }

    /**
     * 智联网
     */
    static async ZhiLian(page, searchCity, searchKey) {
        let city = Utils.GetCityUrlCode(WebsiteType.ZhiLian, searchCity);
        let option = {
            url: `https://sou.zhaopin.com/jobs/searchresult.ashx?jl=${city}&kw=${searchKey}&p=${page}`
        };
        let result = await this.Request(HttpMoth.GET, option);
        return result;
    }

    /**
     * 猎聘网
     */
    static async LiePin(page, searchCity, searchKey) {
        let city = Utils.GetCityUrlCode(WebsiteType.LiePin, searchCity);
        let option = {
            url: `https://www.liepin.com/zhaopin/?dqs=${city}searchType=1&&init=1&sortFlag=15&d_curPage=${page}&d_pageSize=40&key=${searchKey}`
        };
        let result = await this.Request(HttpMoth.GET, option);
        return result;
    }

    /**
     * 前程无忧
     */
    static async QianChengWuYou(page, searchCity, searchKey) {
        let city = Utils.GetCityUrlCode(WebsiteType.QianChengWuYou, searchCity);
        let option = {
            url: `http://search.51job.com/jobsearch/search_result.php?jobarea=${city}&keyword=${searchKey}&curr_page=${page}`,
            encoding: null
        };
        let result = await this.Request(HttpMoth.GET, option);
        result = iconv.decode(result, 'gbk');
        return result;
    }

    /**
     * BOSS直聘
     */
    static async BossZhiPin(page, searchCity, searchKey) {
        let city = Utils.GetCityUrlCode(WebsiteType.BossZhiPin, searchCity);
        let option = {
            url: `http://www.zhipin.com/c${city}/h_101280100/?query=${searchKey}&page=${page}`,
        };
        let result = await this.Request(HttpMoth.GET, option);
        return result;
    }
}