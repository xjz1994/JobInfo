let WebsiteType = require("./EnumType").WebsiteType;
let CityStr = require("./EnumType").CityStr;

module.exports.Utils = class Utils {

    static GetAPIAddress(apiStr, paramStr) {
        return "http://localhost:3001" + apiStr + "?" + paramStr;
    }

    static GetUrlCode(str) {
        return encodeURI(str);
    }

    static GetCityUrlCode(websiteType, cityType) {
        if (websiteType === WebsiteType.LiePin) {
            return CityStr[cityType].liePin;
        } else if (websiteType === WebsiteType.QianChengWuYou) {
            return CityStr[cityType].qianCheng;
        } else if (websiteType === WebsiteType.BossZhiPin) {
            return CityStr[cityType].boss;
        } else {
            return this.GetUrlCode(CityStr[cityType].chinese);
        }
    }

    static CompilePowTwo(types) {
        let res = 0;
        for (let i in types) {
            res |= types[i];
        }
        return res;
    }

    static ParsePowTwo(type) {
        let res = [];
        let bit = type.toString(2).split("");
        for (let i = bit.length - 1; i >= 0; i--) {
            if (bit[i] === "1") {
                res.push(Math.pow(2, bit.length - i - 1));
            }
        }
        return res;
    }
}