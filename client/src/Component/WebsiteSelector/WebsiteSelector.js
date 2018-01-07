import React from 'react';
import './WebsiteSelector.css';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
const WebsiteType = require('../../Public/EnumType').WebsiteType;
const WebsiteStr = require('../../Public/EnumType').WebsiteStr;
const Utils = require('../../Public/Utils').Utils;

const plainOptions = [
    { label: WebsiteStr[WebsiteType.LaGou], value: WebsiteType.LaGou },
    { label: WebsiteStr[WebsiteType.ZhiLian], value: WebsiteType.ZhiLian },
    { label: WebsiteStr[WebsiteType.LiePin], value: WebsiteType.LiePin },
    { label: WebsiteStr[WebsiteType.QianChengWuYou], value: WebsiteType.QianChengWuYou },
    //{ label: WebsiteStr[WebsiteType.BossZhiPin], value: WebsiteType.BossZhiPin }
];

class WebsiteSelector extends React.Component {
    state = {
        checkedList: Utils.ParsePowTwo(this.props.value),
        indeterminate: false,
        checkAll: true,
    };
    render() {
        return (
            <div className="WebsiteSelector">
                <div className="WebsiteSelector-Top">
                    <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                </div>
                <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                >
                    全选
                </Checkbox>
            </div>
        );
    }

    onChange = (checkedList) => {
        this.setState({
            checkedList: checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });

        this.props.onWebsiteChange(Utils.CompilePowTwo(checkedList));
    }

    onCheckAllChange = (e) => {
        let all = [];
        plainOptions.map((ele) => { return all.push(ele.value) });
        let list = e.target.checked ? all : [];

        this.setState({
            checkedList: list,
            indeterminate: false,
            checkAll: e.target.checked,
        });

        this.props.onWebsiteChange(Utils.CompilePowTwo(list));
    }
}

export default WebsiteSelector;