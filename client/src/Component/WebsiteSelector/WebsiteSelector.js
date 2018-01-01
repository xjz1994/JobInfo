import React from 'react';
import { Checkbox } from 'antd';
import './WebsiteSelector.css';
const WebsiteType = require('../../Config/EnumType').WebsiteType;
const WebsiteStr = require('../../Config/EnumType').WebsiteStr;
const CheckboxGroup = Checkbox.Group;

const plainOptions = [
    { label: WebsiteStr[WebsiteType.LaGou], value: WebsiteType.LaGou },
    { label: WebsiteStr[WebsiteType.ZhiLian], value: WebsiteType.ZhiLian },
    { label: WebsiteStr[WebsiteType.LiePin], value: WebsiteType.LiePin },
    { label: WebsiteStr[WebsiteType.QianChengWuYou], value: WebsiteType.QianChengWuYou },
    { label: WebsiteStr[WebsiteType.BossZhiPin], value: WebsiteType.BossZhiPin }
];

const defaultCheckedList = [
    WebsiteType.LaGou,
    WebsiteType.ZhiLian,
    WebsiteType.LiePin,
    WebsiteType.QianChengWuYou,
    WebsiteType.BossZhiPin
];

class WebsiteSelector extends React.Component {
    state = {
        checkedList: defaultCheckedList,
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
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    }
    onCheckAllChange = (e) => {
        let all = [];
        plainOptions.map((ele) => { return all.push(ele.value) });

        this.setState({
            checkedList: e.target.checked ? all : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }
}

export default WebsiteSelector;