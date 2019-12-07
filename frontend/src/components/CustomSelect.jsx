import React from "react";
import { Select } from "antd";

export const CustomSelect = ({ placeholder, options, onChange, onSearch }) => {
  const { Option } = Select;

  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {options.map(value => (
        <Option value={value}>{value}</Option>
      ))}
    </Select>
  );
};
