import React from 'react';
import { Radio } from 'antd';
import './CitySelector.css';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const options = [
    { label: '北京', value: 'Apple' },
    { label: '上海', value: 'Pear' },
    { label: '广州', value: 'Orange' },
    { label: '深圳', value: 'Orange2' },
];

class CitySelector extends React.Component {
    state = {
        value1: 'Apple',
        value2: 'Apple',
        value3: 'Apple',
    }

    onChange = (e) => {
        console.log('radio2 checked', e.target.value);
        this.setState({
            value2: e.target.value,
        });
    }

    items = () => {
        const btns = options.map((opt) => {
            return <RadioButton value={opt.value}>{opt.label}</RadioButton>
        });
        return (
            <RadioGroup>
                {btns}
            </RadioGroup>
        );
    }

    render() {
        return (
            <div className="CitySelector" style={{ width: options.length * 59 }}>
                {this.items()}
            </div>
        );
    }
}

export default CitySelector;