import React, { Component } from 'react';
import axios from 'axios';
import Search from './Component/Search/Search';
import WebsiteSelector from './Component/WebsiteSelector/WebsiteSelector';
import CitySelector from './Component/CitySelector/CitySelector';
import DataTable from './Component/DataTable/DataTable';

const CityType = require('./Public/EnumType').CityType;
const WebsiteType = require('./Public/EnumType').WebsiteType;
const Utils = require('./Public/Utils').Utils;

class App extends Component {

  state = {
    page: 1,
    cityType: CityType.GuangZhou,
    searchKey: "",
    websiteType: WebsiteType.LaGou | WebsiteType.QianChengWuYou | WebsiteType.ZhiLian | WebsiteType.BossZhiPin | WebsiteType.LiePin,
    jobData: []
  };

  getAddress(page = this.state.page) {
    let state = this.state;
    let address = Utils.GetAPIAddress('/api/search', `page=${page}&cityType=${state.cityType}&searchKey=${state.searchKey}&websiteType=${state.websiteType}`);
    return address;
  }

  async onSearch() {
    let res = await axios.get(this.getAddress());
    this.setState({ jobData: res.data });
  }

  async onLastPage() {
    let res = await axios.get(this.getAddress(this.state.page + 1));
    let newData = this.state.jobData.concat(res.data);
    this.setState({ jobData: newData, page: this.state.page + 1 });
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
        <DataTable value={this.state.jobData} onLastPage={this.onLastPage.bind(this)} />
      </div>
    );
  }
}

export default App;
