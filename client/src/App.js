import React, { Component } from 'react';

import Search from './Component/Search/Search';
import WebsiteSelector from './Component/WebsiteSelector/WebsiteSelector';
import CitySelector from './Component/CitySelector/CitySelector';
import DataTable from './Component/DataTable/DataTable';

class App extends Component {
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
