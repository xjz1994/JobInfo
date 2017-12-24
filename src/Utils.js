let WebsiteType = require("./EnumType").WebsiteType;
let CityType = require("./EnumType").CityType;

module.exports.Utils = class Utils {

    static GetUrlCode(str) {
        return encodeURI(str);
    }

    static GetCityUrlCode(websiteType, cityType) {
        if (websiteType == WebsiteType.LiePin) {
            return CityStr[cityType].liePin;
        } else if (websiteType == WebsiteType.QianChengWuYou) {
            return CityStr[cityType].qianCheng;
        } else if (websiteType == WebsiteType.BossZhiPin) {
            return CityStr[cityType].boss;
        } else {
            return this.GetUrlCode(CityStr[cityType].chinese);
        }
    }

}