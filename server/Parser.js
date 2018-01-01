let htmlparser = require("htmlparser");
let iconv = require('iconv-lite');
let WebsiteType = require("./EnumType").WebsiteType;
let getElements = htmlparser.DomUtils.getElements;
let getElement = htmlparser.DomUtils.getElementById;

module.exports.Parser = class Parser {

    static ParseDom(data) {
        return new Promise((resolve, reject) => {
            var handler = new htmlparser.DefaultHandler((error, dom) => {
                if (error) reject(error);
                resolve(dom);
            });
            var parser = new htmlparser.Parser(handler);
            parser.parseComplete(data);
        });
    }

    static LaGou(data) {
        let jsonData = JSON.parse(data);
        let result = jsonData.content.positionResult.result;
        for (let i in result) {
            let item = result[i];
            item.href = `https://www.lagou.com/jobs/${item.companyId}.html`;
            item.companyHref = `https://www.lagou.com/gongsi/${item.positionId}.html`;
            item.websiteType = WebsiteType.LaGou;
        }
        return result;
    }

    static async ZhiLian(data) {
        let result = [];
        let dom = await this.ParseDom(data);
        let list = getElements({ tag_name: "table", class: "newlist" }, dom);
        for (let i = 1; i < list.length; i++) {
            let item = list[i];
            let data = {};

            let positionDom = getElements({ tag_name: "a", style: "font-weight: bold" }, item)[0];
            data.href = positionDom.attribs.href;
            data.positionName = "";
            for (let index in positionDom.children) {
                let span = positionDom.children[index];
                if (!span.children) {
                    data.positionName += span.data;
                } else {
                    data.positionName += span.children[0].data;
                }
            }

            let companyDom = getElements({ tag_name: "td", class: "gsmc" }, item)[0];
            data.companyShortName = companyDom.children[0].children[0].data;
            data.companyHref = companyDom.children[0].attribs.href;

            data.salary = getElements({ tag_name: "td", class: "zwyx" }, item)[0].children[0].data;
            data.district = data.city = getElements({ tag_name: "td", class: "gzdd" }, item)[0].children[0].data;

            data.formatCreateTime = getElements({ tag_name: "td", class: "gxsj" }, item)[0].children[0].children[0].data;

            let detailListDom = getElements({ tag_name: "li", class: "newlist_deatil_two" }, item)[0];
            data.companySize = detailListDom.children[2].children[0].data;
            data.workYear = detailListDom.children[3].children[0].data;
            data.education = detailListDom.children[4].children[0].data;

            data.websiteType = WebsiteType.ZhiLian;

            result.push(data);
        }
        return result;
    }

    static async QianChengWuYou(data) {
        let result = [];
        let dataStr = iconv.decode(data, 'gbk');
        let dom = await this.ParseDom(dataStr);
        let resultList = getElements({ tag_name: "div", id: "resultList", class: "dw_table" }, dom);
        let hotList = getElements({ tag_name: "div", class: "el mk" }, resultList);
        let normalList = getElements({ tag_name: "div", class: "el" }, resultList);
        let list = hotList.concat(normalList);
        for (let i in list) {
            let item = list[i];
            let data = {};

            let links = getElements({ tag_name: "a", target: "_blank" }, item);
            data.href = links[0].attribs.href;
            data.positionName = links[0].attribs.title;

            data.conpanyHref = links[1].attribs.href;
            data.companyShortName = links[1].attribs.title;

            data.district = data.city = getElements({ tag_name: "span", class: "t3" }, item)[0].children[0].data;
            data.salary = getElements({ tag_name: "span", class: "t4" }, item)[0].children[0].data;
            data.formatCreateTime = getElements({ tag_name: "span", class: "t5" }, item)[0].children[0].data;

            data.websiteType = WebsiteType.QianChengWuYou;
            result.push(data);
        }
        return result;
    }

    static async LiePin(data) {
        let result = [];
        let dom = await this.ParseDom(data);

        let list = getElements({ tag_name: "div", class: "sojob-item-main clearfix" }, dom);
        for (let i in list) {
            let item = list[i];
            let data = {};

            let jobInfo = getElements({ tag_name: "div", class: "job-info" }, list[i])[0];
            data.href = getElements({ tag_name: "a" }, jobInfo)[0].attribs.href;
            data.positionName = getElements({ tag_name: "h3" }, jobInfo)[0].attribs.title;

            data.salary = getElements({ tag_name: "span", class: "text-warning" }, jobInfo)[0].children[0].data;

            let area = getElements({ tag_name: "a", class: "area" }, jobInfo)[0]
            area && (data.district = area.children[0].data);

            data.formatCreateTime = getElements({ tag_name: "time" }, item)[0].attribs.title;
            data.workYear = getElements({ tag_name: "p", class: "condition clearfix" }, item)[0].children[7].children[0].data;
            data.education = getElements({ tag_name: "span", class: "edu" }, item)[0].children[0].data;

            let companyInfo = getElements({ tag_name: "div", class: "company-info nohover" }, list[i])[0];
            data.conpanyHref = getElements({ tag_name: "p", class: "company-name" }, companyInfo)[0].children[1].attribs.href;
            data.companyShortName = getElements({ tag_name: "p", class: "company-name" }, companyInfo)[0].children[1].attribs.title;

            data.industryField = getElements({ tag_name: "p", class: "field-financing" }, companyInfo)[0].children[1].children[1].children[0].data
            data.positionAdvantage = "|";
            let adv = getElements({ tag_name: "p", class: "temptation clearfix" }, companyInfo)[0];
            for (let i in adv.children) {
                let child = adv.children[i];
                if (child.children) {
                    data.positionAdvantage += child.children[0].data + "|";
                }
            }

            data.websiteType = WebsiteType.LiePin;
            result.push(data);
        }
        return result;
    }

    static async BossZhiPin(data) {
        let result = [];
        let dom = await this.ParseDom(data);

        let jobList = getElements({ tag_name: "div", class: "job-list" }, dom);
        let list = getElements({ tag_name: "li" }, jobList);

        for (let i in list) {
            let item = list[i];
            let data = {};

            let nameDom = getElements({ tag_name: "h3", class: "name" }, item);
            let titleDom = nameDom[0];
            let href = titleDom.children[0].attribs.href;
            data.href = `https://www.zhipin.com/${href}`;
            data.positionName = titleDom.children[0].children[0].data;
            data.salary = titleDom.children[0].children[1].children[0].data;

            let pDom = getElements({ tag_name: "p" }, item);
            data.district = pDom[0].children[0].data;
            data.workYear = pDom[0].children[2].data;
            data.education = pDom[0].children[4].data;

            data.industryField = pDom[1].children[0].data;
            data.companySize = pDom[1].children[4].data;
            data.financeStage = pDom[1].children[2].data;

            let companyHref = nameDom[1].children[0].attribs.href;
            data.conpanyHref = `https://www.zhipin.com/${companyHref}`;
            data.companyShortName = nameDom[1].children[0].children[0].data;

            data.formatCreateTime = getElements({ tag_name: "span", class: "time" }, item)[0].children[0].data;

            data.websiteType = WebsiteType.BossZhiPin;
            result.push(data);
        }
        return result;
    }

    /**
    * 根据类型，解析相应数据
    */
    static async ParseData(data) {
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

    static async ParseAllData(data) {
        let res = [];
        for (let i in data) {
            let d = await this.ParseData(data[i]);
            res = res.concat(d);
        }
        return res;
    }
}