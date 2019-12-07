import React, { Component } from 'react';
import { Form, Input, DatePicker, Radio, Button, Row } from 'antd';

import { CustomSelect, UserRemoteSelect } from '../components/Selects';
import { CheckboxGroup } from '../components/CheckboxGroup';

const { TextArea } = Input;

const formItemLayout = {
  labelAlign: 'left',
  labelCol: {
    sm: { span: 24 },
    md: { span: 12 },
    xl: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 24 },
    md: { span: 11, offset: 1 },
    lg: { span: 8 },
  },
};

class NewRequestForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        date: fieldsValue['date'].format('YYYY-MM-DD'),
      };
      console.log('Received values of form: ', values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Укажите гос. номер автомобиля" required>
          {getFieldDecorator('carNumber', {
            rules: [
              {
                required: true,
                message: 'Введите номер автомобиля',
              },
            ],
          })(
            <CustomSelect
              placeholder="x000xx"
              options={[
                'A000AA',
                'B000BB',
                'C345CC',
                'X304YH',
                'B777OP',
                'B302PY',
                'C567PY',
                'O111BH',
              ]}
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label="Выберите город обслуживания" required>
          {getFieldDecorator('city', {
            rules: [
              {
                required: true,
                message: 'Введите название города',
              },
            ],
          })(
            <UserRemoteSelect
              placeholder="Город"
              options={['Москва', 'Питер']}
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label="Укажите текущий пробег автомобиля">
          {getFieldDecorator('kilometrage')(
            <Input
              type="number"
              placeholder="Пробег"
              addonAfter="км"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label="Выберите услуги, в которых нуждается автомобиль">
          <Row>
            <CheckboxGroup
              getFieldDecorator={getFieldDecorator}
              name="services"
              options={[
                'Регулярное ТО',
                'Замена щёток стеклоочистителя',
                'Долив масла',
              ]}
            />
          </Row>
          <Row>
            {getFieldDecorator('otherServices')(
              <TextArea
                placeholder="Другие услуги"
                rows={4}
                style={{ fontSize: '16px' }}
              />
            )}
          </Row>
        </Form.Item>
        <Form.Item label="Выберите дату и время обслуживания/ремонта">
          <Row type="flex" justify="space-between">
            <Form.Item>
              {getFieldDecorator('date')(
                <DatePicker
                  size={'large'}
                  placeholder="Выберите дату"
                  style={{ marginRight: '20px', marginBottom: '15px' }}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('dayHalf', {
                initialValue: 'am',
              })(
                <Radio.Group buttonStyle="solid" size="large">
                  <Radio.Button value="am">До 14:00</Radio.Button>
                  <Radio.Button value="pm">После 14:00</Radio.Button>
                </Radio.Group>
              )}
            </Form.Item>
          </Row>
        </Form.Item>
        <Button type="primary" htmlType="submit" size="large">
          Отправить заявку
        </Button>
      </Form>
    );
  }
}
export default Form.create({ name: 'request' })(NewRequestForm);
