import React from 'react';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

const plainOptions = [
    { label: '啊', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
];
const defaultCheckedList = ['Apple', 'Pear', 'Orange'];

class WebsiteSelector extends React.Component {
    state = {
        checkedList: defaultCheckedList,
        indeterminate: false,
        checkAll: true,
    };
    render() {
        return (
            <div>
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                </Checkbox>
                </div>
                <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
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