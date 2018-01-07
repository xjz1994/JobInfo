import React from 'react';
import './CitySelector.css';
import { Radio } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const CityType = require('../../Public/EnumType').CityType;
const CityStr = require('../../Public/EnumType').CityStr;

const options = [
    { label: CityStr[CityType.BeiJing].chinese, value: CityType.BeiJing },
    { label: CityStr[CityType.ShangHai].chinese, value: CityType.ShangHai },
    { label: CityStr[CityType.GuangZhou].chinese, value: CityType.GuangZhou },
    { label: CityStr[CityType.ShenZhen].chinese, value: CityType.ShenZhen },
];

class CitySelector extends React.Component {

    items = () => {
        const btns = options.map((opt) => {
            return <RadioButton value={opt.value} key={opt.value}>{opt.label}</RadioButton>
        });
        return (
            <RadioGroup value={this.props.value} onChange={this.props.onCityChange}>
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