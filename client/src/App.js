import React, { Component } from 'react';
//import axios from 'axios';
import Search from './Component/Search/Search';
import WebsiteSelector from './Component/WebsiteSelector/WebsiteSelector';
import CitySelector from './Component/CitySelector/CitySelector';
import DataTable from './Component/DataTable/DataTable';

class App extends Component {

  componentDidMount() {
    this.fetch();
  }

  fetch() {

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
