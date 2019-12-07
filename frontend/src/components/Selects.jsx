import React, { Component } from 'react';

import { Select, Spin } from 'antd';
import debounce from 'lodash.debounce';

export class CustomSelect extends Component {
  state = {
    value: [],
  };

  handleChange = (value) => {
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
        optionFilterProp="children"
        onChange={this.handleChange}
        notFoundContent={null}
        showArrow={false}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().includes(input.toLowerCase())
        }
        {...this.props}
      >
        {options.map((value) => (
          <Option key={value} value={value}>
            {value}
          </Option>
        ))}
      </Select>
    );
  }
}

const { Option } = Select;

export class UserRemoteSelect extends Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  fetchUser = (value) => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    // TODO: заменить на апишку из пропсовы
    fetch(`https://swapi.co/api/people/?search=${value}`)
      .then((response) => response.json())
      .then((body) => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        const data = body.results.map((user) => ({
          text: `${user.name}`,
          value: user.name,
        }));
        this.setState({ data, fetching: false });
      });
  };

  handleChange = (value) => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  render() {
    const { fetching, data, value } = this.state;
    return (
      <Select
        showSearch
        value={value}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        showArrow={false}
        onSearch={this.fetchUser}
        onChange={this.handleChange}
        style={{ width: '100%' }}
        {...this.props}
      >
        {data.map((d) => (
          <Option key={d.value}>{d.text}</Option>
        ))}
      </Select>
    );
  }
}