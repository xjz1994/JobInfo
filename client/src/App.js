import React, { Component } from 'react';
import axios from 'axios';
import Search from './Component/Search/Search';
import WebsiteSelector from './Component/WebsiteSelector/WebsiteSelector';
import CitySelector from './Component/CitySelector/CitySelector';
import DataTable from './Component/DataTable/DataTable';

const CityType = require('./Public/EnumType').CityType;
const WebsiteType = require('./Public/EnumType').WebsiteType;

class App extends Component {

  state = {
    cityType: CityType.GuangZhou,
    searchKey: "",
    websiteType: WebsiteType.LaGou | WebsiteType.QianChengWuYou | WebsiteType.ZhiLian | WebsiteType.BossZhiPin | WebsiteType.LiePin,
    jobData: [{ "companyId": 243689, "positionName": ".NET开发工程师", "workYear": "1-3年", "education": "本科", "jobNature": "全职", "financeStage": "不需要融资", "companyLogo": "i/image/M00/5A/AF/CgpFT1mNDfyAL_zFAAApXtSzfKI79.jpeg", "industryField": "企业服务,信息安全", "city": "广州", "salary": "6k-12k", "positionId": 3842294, "positionAdvantage": "技术大牛,内部培训,丰厚奖金,优秀团队", "companyShortName": "利通科技", "district": "萝岗区", "createTime": "2018-01-05 15:00:05", "score": 0, "approve": 1, "positionLables": ["中级", "软件开发"], "industryLables": [], "publisherId": 8674302, "companyLabelList": ["年底双薪", "节日礼物", "技能培训", "绩效奖金"], "companySize": "150-500人", "businessZones": null, "longitude": "113.435587", "latitude": "23.168658", "formatCreateTime": "1天前发布", "imState": "today", "lastLogin": 1515138381000, "explain": null, "plus": null, "pcShow": 0, "appShow": 0, "deliver": 0, "gradeDescription": null, "promotionScoreExplain": null, "firstType": "开发/测试/运维类", "secondType": "软件开发", "isSchoolJob": 0, "subwayline": null, "stationname": null, "linestaion": null, "companyFullName": "广东利通科技投资有限公司", "adWord": 0, "href": "https://www.lagou.com/jobs/243689.html", "companyHref": "https://www.lagou.com/gongsi/3842294.html", "websiteType": 2 }]
  };

  async onSearch() {
    let address = `https://127.0.0.1/api/search?cityType=${this.state.cityType}&searchKey=${this.state.searchKey}&websiteType=${this.state.websiteType}`;
    console.log(address);
    // let res = await axios.get(address);
    // console.log(res);
  }

  onSearchKeyChange(e) {
    this.setState({ searchKey: e.target.value });
  }

  onCityChange(e) {
    this.setState({ cityType: e.target.value });
  }

  onWebsiteChange(type) {
    this.setState({ websiteType: type });
  }

  render() {
    return (
      <div>
        <Search onSearch={this.onSearch.bind(this)} onSearchKeyChange={this.onSearchKeyChange.bind(this)} />
        <CitySelector value={this.state.cityType} onCityChange={this.onCityChange.bind(this)} />
        <WebsiteSelector value={this.state.websiteType} onWebsiteChange={this.onWebsiteChange.bind(this)} />
        <DataTable value={this.state.jobData} />
      </div>
    );
  }
}

export default App;
