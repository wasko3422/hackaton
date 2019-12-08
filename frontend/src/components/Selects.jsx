import React, { Component } from 'react';

import { Select } from 'antd';

export class CustomSelect extends Component {
  state = {
    value: [],
  };

  handleSelect = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { Option } = Select;
    const { value } = this.state;
    const { options } = this.props;
    return (
      <Select
        showSearch
        value={value}
        defaultActiveFirstOption={false}
        optionFilterProp="value"
        onSelect={this.handleSelect}
        notFoundContent={null}
        showArrow={false}
        filterOption={(input, option) =>
          option.props.value.toLowerCase().includes(input.toLowerCase())
        }
        {...this.props}
      >
        {options.map(({ value, label }) => (
          <Option key={value} value={value}>
            {label}
          </Option>
        ))}
      </Select>
    );
  }
}
