import React, { Component } from 'react';
import axios from 'axios';
import Search from './Component/Search/Search';
import WebsiteSelector from './Component/WebsiteSelector/WebsiteSelector';
import CitySelector from './Component/CitySelector/CitySelector';
import DataTable from './Component/DataTable/DataTable';

class App extends Component {

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    axios.get("http://127.0.0.1:3000/api/search").then((data) => {
      console.log(JSON.parse(data.request.response));
    })
  }

  render() {
    return (
      <div>
        <Search />
        <CitySelector />
        <WebsiteSelector />
        <DataTable />
      </div>
    );
  }
}

export default App;
