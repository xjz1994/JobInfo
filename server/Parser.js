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
            curData.href = `https://www.lagou.com/jobs/${item.positionId}.html`;
            curData.companyHref = `https://www.lagou.com/gongsi/${item.companyId}.html`;
            curData.websiteType = WebsiteType.LaGou;
        }
        return result;
    }

    static async ZhiLian(data) {
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
            let detailStr = $('li[class=newlist_deatil_two]', item).text()
            let yearMatch = detailStr.match(/经验：(.*?)学历/);
            curData.workYear = yearMatch ? yearMatch[1] : "";
            let eduMatch = detailStr.match(/学历：(.*?)职位/);
            curData.education = eduMatch ? eduMatch[1] : "";

            curData.websiteType = WebsiteType.ZhiLian;
            result.push(curData);
        }
        return result;
    }

    static async QianChengWuYou(data) {
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

    static async LiePin(data) {
        let result = [];
        // let dom = await this.ParseDom(data);

        // let list = getElements({ tag_name: "div", class: "sojob-item-main clearfix" }, dom);
        // for (let i in list) {
        //     let item = list[i];
        //     let data = {};

        //     let jobInfo = getElements({ tag_name: "div", class: "job-info" }, list[i])[0];
        //     data.href = getElements({ tag_name: "a" }, jobInfo)[0].attribs.href;
        //     data.positionName = getElements({ tag_name: "h3" }, jobInfo)[0].attribs.title;

        //     data.salary = getElements({ tag_name: "span", class: "text-warning" }, jobInfo)[0].children[0].data;

        //     let area = getElements({ tag_name: "a", class: "area" }, jobInfo)[0]
        //     area && (data.district = area.children[0].data);

        //     data.formatCreateTime = getElements({ tag_name: "time" }, item)[0].attribs.title;
        //     data.workYear = getElements({ tag_name: "p", class: "condition clearfix" }, item)[0].children[7].children[0].data;
        //     data.education = getElements({ tag_name: "span", class: "edu" }, item)[0].children[0].data;

        //     let companyInfo = getElements({ tag_name: "div", class: "company-info nohover" }, list[i])[0];
        //     data.companyHref = getElements({ tag_name: "p", class: "company-name" }, companyInfo)[0].children[1].attribs.href;
        //     data.companyShortName = getElements({ tag_name: "p", class: "company-name" }, companyInfo)[0].children[1].attribs.title;

        //     data.industryField = getElements({ tag_name: "p", class: "field-financing" }, companyInfo)[0].children[1].children[1].children[0].data
        //     data.positionAdvantage = "|";
        //     let adv = getElements({ tag_name: "p", class: "temptation clearfix" }, companyInfo)[0];
        //     for (let i in adv.children) {
        //         let child = adv.children[i];
        //         if (child.children) {
        //             data.positionAdvantage += child.children[0].data + "|";
        //         }
        //     }

        //     data.websiteType = WebsiteType.LiePin;
        //     result.push(data);
        // }
        return result;
    }

    static async BossZhiPin(data) {
        let result = [];
        // let dom = await this.ParseDom(data);

        // let jobList = getElements({ tag_name: "div", class: "job-list" }, dom);
        // let list = getElements({ tag_name: "li" }, jobList);

        // for (let i in list) {
        //     let item = list[i];
        //     let data = {};

        //     let nameDom = getElements({ tag_name: "h3", class: "name" }, item);
        //     let titleDom = nameDom[0];
        //     let href = titleDom.children[0].attribs.href;
        //     data.href = `https://www.zhipin.com/${href}`;
        //     data.positionName = titleDom.children[0].children[0].data;
        //     data.salary = titleDom.children[0].children[1].children[0].data;

        //     let pDom = getElements({ tag_name: "p" }, item);
        //     data.district = pDom[0].children[0] && pDom[0].children[0].data;
        //     data.workYear = pDom[0].children[2] && pDom[0].children[2].data;
        //     data.education = pDom[0].children[4] && pDom[0].children[4].data;

        //     data.industryField = pDom[1].children[0] && pDom[1].children[0].data;
        //     data.companySize = pDom[1].children[4] && pDom[1].children[4].data;
        //     data.financeStage = pDom[1].children[2] && pDom[1].children[2].data;

        //     let companyHref = nameDom[1].children[0].attribs.href;
        //     data.companyHref = `https://www.zhipin.com/${companyHref}`;
        //     data.companyShortName = nameDom[1].children[0].children[0].data;

        //     data.formatCreateTime = getElements({ tag_name: "span", class: "time" }, item)[0].children[0].data;

        //     data.websiteType = WebsiteType.BossZhiPin;
        //     result.push(data);
        // }
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
