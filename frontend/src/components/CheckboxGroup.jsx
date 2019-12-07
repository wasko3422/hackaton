import React from 'react';
import { Checkbox } from 'antd';

export class CheckboxGroup extends React.Component {
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
  };

  onChange = (checkedList) => {
    const { options } = this.props;
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < options.length,
      checkAll: checkedList.length === options.length,
    });
  };

  onCheckAllChange = (e) => {
    const { options } = this.props;

    this.setState({
      checkedList: e.target.checked ? options : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    const { getFieldDecorator, name } = this.props;
    return (
      <div>
        {this.props.checkAll && (
          <div style={{ borderBottom: '1px solid #E9E9E9' }}>
            <Checkbox
              indeterminate={this.state.indeterminate}
              onChange={this.onCheckAllChange}
              checked={this.state.checkAll}
            >
              Выбрать все
            </Checkbox>
            <br />
          </div>
        )}
        {getFieldDecorator(name)(
          <Checkbox.Group
            options={this.props.options}
            value={this.state.checkedList}
            onChange={this.onChange}
          />
        )}
      </div>
    );
  }
}
