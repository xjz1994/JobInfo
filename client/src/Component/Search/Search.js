import React from 'react';
import './Search.css';
import { Input } from 'antd';
const Search = Input.Search;

class SearchArea extends Input.Search {
    render() {
        return (
            <div className="Search">
                <Search
                    placeholder="请输入职位关键字"
                    onSearch={value => console.log(value)}
                    enterButton
                    size="large"
                />
            </div>
        );
    }
}

export default SearchArea;