import React from 'react';
import './DataTable.css';
import { Table } from 'antd';
const WebsiteStr = require('../../Public/EnumType').WebsiteStr;

const columns = [
    {
        title: '岗位名称',
        dataIndex: 'positionName',
        key: 'positionName',
        render: text => <a href="">{text}</a>,
    },
    {
        title: '公司名称',
        dataIndex: 'companyShortName',
        key: 'companyShortName',
        render: text => <a href="">{text}</a>,
    },
    {
        title: '工作年限',
        dataIndex: 'workYear',
        key: 'workYear',
    },
    {
        title: '学历',
        dataIndex: 'education',
        key: 'education',
    },
    {
        title: '薪酬',
        dataIndex: 'salary',
        key: 'salary',
    },
    {
        title: '发布时间',
        dataIndex: 'formatCreateTime',
        key: 'formatCreateTime',
    },
    {
        title: '工作地点',
        dataIndex: 'district',
        key: 'district',
    },
    {
        title: '数据来源',
        dataIndex: 'websiteType',
        key: 'websiteType',
        render: text => <span>{WebsiteStr[text]}</span>,
    }
];

class DataTable extends React.Component {
    render() {
        return (
            <div className="DataTable">
                <Table columns={columns} dataSource={this.props.value} />
            </div>
        );
    }
}

export default DataTable;