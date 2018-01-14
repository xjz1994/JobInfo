import React from 'react';
import './DataTable.css';
import { Table } from 'antd';
const WebsiteStr = require('../../Public/EnumType').WebsiteStr;

class DataTable extends React.Component {
    columns = [
        {
            title: '岗位名称',
            dataIndex: 'positionName',
            key: 'positionName',
            render: (text, record) => {
                return (
                    <a onClick={() => { this.onJobClick(record) }}>{text}</a>
                );
            },
        },
        {
            title: '公司名称',
            dataIndex: 'companyShortName',
            key: 'companyShortName',
            render: (text, record) => {
                return (
                    <a onClick={() => { this.onCompanyClick(record) }}>{text}</a>
                );
            },
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

    state = {
        pagination: {
            showSizeChanger: true,
            onChange: this.onPageChange.bind(this),
            onShowSizeChange: this.onPageChange.bind(this)
        }
    }

    onPageChange(pageNum, total) {
        if (pageNum * total >= this.props.jobData.length) {
            this.props.onLastPage();
        }
    }

    onJobClick(record) {
        window.open(record.href, '_blank');
    }

    onCompanyClick(record) {
        window.open(record.companyHref, '_blank');
    }

    render() {
        return (
            <div className="DataTable">
                <Table {...this.state} columns={this.columns} dataSource={this.props.jobData} ref={this.onchange} />
            </div>
        );
    }
}

export default DataTable;