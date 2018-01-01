import React from 'react';
import { Table } from 'antd';
import './DataTable.css';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="">{text}</a>,
    }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    }
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
    }
];

class DataTable extends React.Component {
    render() {
        return (
            <div className="DataTable">
                <Table columns={columns} dataSource={data} />
            </div>
        );
    }
}

export default DataTable;