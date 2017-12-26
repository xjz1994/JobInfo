let htmlparser = require("htmlparser");
let WebsiteType = require("./EnumType").WebsiteType;

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
            result[i].websiteType = WebsiteType.LaGou;
        }
        return result;
    }

    static async ZhiLian(data) {
        let result = [];
        let dom = await this.ParseDom(data);
        let list = htmlparser.DomUtils.getElements({ tag_name: "table", class: "newlist" }, dom);
        for (let i = 1; i < list.length; i++) {
            let item = list[i];
            let data = {};

            let positionDom = htmlparser.DomUtils.getElements({ tag_name: "a", style: "font-weight: bold" }, item)[0];
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

            let companyDom = htmlparser.DomUtils.getElements({ tag_name: "td", class: "gsmc" }, item)[0];
            data.conpanyHref = companyDom.children[0].children[0].data;
            data.companyShortName = companyDom.children[0].data;

            data.salary = htmlparser.DomUtils.getElements({ tag_name: "td", class: "zwyx" }, item)[0].children[0].data;
            data.district = data.city = htmlparser.DomUtils.getElements({ tag_name: "td", class: "gzdd" }, item)[0].children[0].data;

            data.formatCreateTime = htmlparser.DomUtils.getElements({ tag_name: "td", class: "gxsj" }, item)[0].children[0].children[0].data;

            let detailListDom = htmlparser.DomUtils.getElements({ tag_name: "li", class: "newlist_deatil_two" }, item)[0];
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
        let dom = await this.ParseDom(data);
        let resultList = htmlparser.DomUtils.getElements({ tag_name: "div", id: "resultList", class: "dw_table" }, dom);
        let hotList = htmlparser.DomUtils.getElements({ tag_name: "div", class: "el mk" }, resultList);
        let normalList = htmlparser.DomUtils.getElements({ tag_name: "div", class: "el" }, resultList);
        let list = hotList.concat(normalList);
        for (let i in list) {
            let item = list[i];
            let data = {};

            let links = htmlparser.DomUtils.getElements({ tag_name: "a", target: "_blank" }, item);
            data.href = links[0].attribs.href;
            data.positionName = links[0].attribs.title;

            data.conpanyHref = links[1].attribs.href;
            data.companyShortName = links[1].attribs.title;

            data.district = data.city = htmlparser.DomUtils.getElements({ tag_name: "span", class: "t3" }, item)[0].children[0].data;
            data.salary = htmlparser.DomUtils.getElements({ tag_name: "span", class: "t4" }, item)[0].children[0].data;
            data.formatCreateTime = htmlparser.DomUtils.getElements({ tag_name: "span", class: "t5" }, item)[0].children[0].data;

            data.websiteType = WebsiteType.QianChengWuYou;
            result.push(data);
        }
        return result;
    }

    static async LiePin(data) {
        let json = {};
        let dom = await this.ParseDom(data);
        return json;
    }

    static async BossZhiPin(data) {
        let json = {};
        let dom = await this.ParseDom(data);
        return json;
    }
}
