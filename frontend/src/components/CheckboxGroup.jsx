import React from 'react';
import { Checkbox, Row } from 'antd';

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
        {getFieldDecorator(name, { setFieldsValue: this.state.checkedList })(
          <Checkbox.Group onChange={this.onChange}>
            {this.props.options.map(({ value, label }) => (
              <Row key={value} style={{ marginBottom: '0.5em' }}>
                <Checkbox value={value} style={{ fontSize: '16px' }}>
                  {label}
                </Checkbox>
              </Row>
            ))}
          </Checkbox.Group>
        )}
      </div>
    );
  }
}
