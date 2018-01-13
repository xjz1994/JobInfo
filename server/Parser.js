let cheerio = require('cheerio');
let iconv = require('iconv-lite');
let WebsiteType = require("./EnumType").WebsiteType;
let Utils = require("./Utils").Utils;

module.exports.Parser = class Parser {

    static LaGou(data) {
        let jsonData = JSON.parse(data);
        let result = jsonData.content.positionResult.result;
        for (let i in result) {
            console.log("lagou:", i);
            let item = result[i];
            item.href = `https://www.lagou.com/jobs/${item.positionId}.html`;
            item.companyHref = `https://www.lagou.com/gongsi/${item.companyId}.html`;
            item.websiteType = WebsiteType.LaGou;
        }
        return result;
    }

    static ZhiLian(data) {
        let result = [];
        let $ = cheerio.load(data);
        let tbodys = $('table[class=newlist]', $('div[id=newlist_list_content_table]'));
        for (let i = 1; i < tbodys.length; i++) {
            console.log("zhilian:", i);
            let curData = {};
            let item = tbodys[i];

            //职位
            let positionDom = $('a', $('td[class=zwmc]', item));
            curData.href = positionDom.attr().href;
            curData.positionName = positionDom.text();

            //公司
            let companyDom = $('a', $('td[class=gsmc]', item));
            curData.companyHref = companyDom.attr().href;
            curData.companyShortName = companyDom.text();

            //薪酬、地区、发布时间
            curData.salary = $('td[class=zwyx]', item).text();
            curData.district = $('td[class=gzdd]', item).text();
            curData.formatCreateTime = $('td[class=gxsj]', item).text();

            ///从详细描述中匹配出经验和学历
            let detailStr = $('li[class=newlist_deatil_two]', item).text();
            let yearMatch = detailStr.match(/经验：(.*?)(学|职)/);
            curData.workYear = yearMatch ? yearMatch[1] : "";
            let eduMatch = detailStr.match(/学历：(.*?)(职)/);
            curData.education = eduMatch ? eduMatch[1] : "";

            curData.websiteType = WebsiteType.ZhiLian;
            result.push(curData);
        }
        return result;
    }

    static QianChengWuYou(data) {
        let result = [];
        data = iconv.decode(data, 'gbk');
        let $ = cheerio.load(data);
        let list = $('div[class=el]', $('div[id=resultList]'));
        for (let i = 0; i < list.length; i++) {
            console.log("qiancheng:", i);
            let curData = {};
            let item = list[i];

            //职位
            let positionDom = $('a', $('p', item));
            curData.positionName = positionDom.attr().title;
            curData.href = positionDom.attr().href;

            //公司
            let companyDom = $('a', $('span[class=t2]', item));
            curData.companyShortName = companyDom.attr().title;
            curData.companyHref = companyDom.attr().href;

            //薪酬、地区、发布时间
            curData.salary = $('span[class=t4]', item).text();
            curData.district = $('span[class=t3]', item).text();
            curData.formatCreateTime = $('span[class=t5]', item).text();

            curData.websiteType = WebsiteType.QianChengWuYou;
            result.push(curData);
        }
        return result;
    }

    static LiePin(data) {
        let result = [];
        let $ = cheerio.load(data);
        let list = $('.sojob-item-main.clearfix', $('ul[class=sojob-list]'));
        for (let i = 0; i < list.length; i++) {
            console.log("liepin:", i);
            let curData = {};
            let item = list[i];

            //职位
            let positionDom = $('a', $('h3', item));
            curData.positionName = positionDom.text().trim();
            curData.href = positionDom.attr().href;

            //公司
            let companyDom = $('a', $('p[class=company-name]', item));
            curData.companyShortName = companyDom.attr().title;
            curData.companyHref = companyDom.attr().href;

            //薪酬、地区、学历、年限
            let infoArr = $('.condition.clearfix', item).attr().title.split("_");
            curData.salary = infoArr[0];
            curData.district = infoArr[1];
            curData.education = infoArr[2];
            curData.workYear = infoArr[3];

            curData.websiteType = WebsiteType.LiePin;
            result.push(curData);
        }
        return result;
    }

    static BossZhiPin(data) {
        let result = [];
        let $ = cheerio.load(data);
        let list = $('li', $('ul', $('div[class=job-list]')));
        for (let i = 0; i < list.length; i++) {
            console.log("boss:", i);
            let curData = {};
            let item = list[i];

            //职位
            let positionDom = $('a', $('div[class=info-primary]', item));
            curData.positionName = positionDom.text();
            curData.href = `http://www.zhipin.com/${positionDom.attr().href}`;

            //公司
            let companyDom = $('a', $('div[class=info-company]', item));
            curData.companyShortName = companyDom.text();
            curData.companyHref = `http://www.zhipin.com/${companyDom.attr().href}`;

            //薪酬
            curData.salary = $('span[class=red]', item).text();

            //地区、学历、年限
            let primayInfo = $('p', $('div[class=info-primary]', item)).contents()
            curData.district = primayInfo[0].data;
            curData.education = primayInfo[2].data;
            curData.workYear = primayInfo[4].data;

            curData.websiteType = WebsiteType.BossZhiPin;
            result.push(curData);
        }
        return result;
    }

    /**
    * 根据类型，解析相应数据
    */
    static ParseData(data) {
        switch (data.type) {
            case WebsiteType.LaGou:
                return this.LaGou(data.body);
            case WebsiteType.ZhiLian:
                return this.ZhiLian(data.body);
            case WebsiteType.QianChengWuYou:
                return this.QianChengWuYou(data.body);
            case WebsiteType.LiePin:
                return this.LiePin(data.body);
            case WebsiteType.BossZhiPin:
                return this.BossZhiPin(data.body);
        }
    }

    static ParseAllData(data) {
        let res = [];
        for (let i in data) {
            let d = this.ParseData(data[i]);
            res = res.concat(d);
        }
        return res;
    }
}
