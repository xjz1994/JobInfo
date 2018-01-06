import React from 'react';
import './CitySelector.css';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CityType = require('../../Config/EnumType').CityType;
const CityStr = require('../../Config/EnumType').CityStr;

const options = [
    { label: CityStr[CityType.BeiJing].chinese, value: CityType.BeiJing },
    { label: CityStr[CityType.ShangHai].chinese, value: CityType.ShangHai },
    { label: CityStr[CityType.GuangZhou].chinese, value: CityType.GuangZhou },
    { label: CityStr[CityType.ShenZhen].chinese, value: CityType.ShenZhen },
];

class CitySelector extends React.Component {
    state = {
        value: CityType.GuangZhou
    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    items = () => {
        const btns = options.map((opt) => {
            return <RadioButton value={opt.value} key={opt.value}>{opt.label}</RadioButton>
        });
        return (
            <RadioGroup value={this.state.value} onChange={this.onChange}>
                {btns}
            </RadioGroup>
        );
    }

    render() {
        return (
            <div className="CitySelector">
                {this.items()}
            </div>
        );
    }
}

export default CitySelector;