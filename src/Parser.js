let htmlparser = require("htmlparser");

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
        let json = JSON.parse(data);
        return json.content.positionResult.result;
    }

    static async ZhiLian(data) {
        let json = {};
        let dom = await this.ParseDom(data);
        return json;
    }

    static async LiePin(data) {
        let json = {};
        let dom = await this.ParseDom(data);
        return json;
    }

    static async QianChengWuYou(data) {
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