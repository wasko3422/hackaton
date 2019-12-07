import React from 'react';
import { Typography, Form, Input, DatePicker, Radio, Button } from 'antd';

import { CustomSelect, UserRemoteSelect } from '../components/Selects';
import { CheckboxGroup } from '../components/CheckboxGroup';

const { Title } = Typography;
const { TextArea } = Input;

const RequestForm = ({ form }) => {
  const { getFieldDecorator } = form;
  const dateConfig = {
    rules: [{ type: 'object', required: true, message: 'Please select time!' }],
  };
  return (
    <Form
      layout="vertical"
      onSubmit={(e) => {
        e.preventDefault();
        form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const values = {
            ...fieldsValue,
            date: fieldsValue['date'].format('YYYY-MM-DD'),
          };
          console.log('Received values of form: ', values);
        });
      }}
    >
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
        <CheckboxGroup
          getFieldDecorator={getFieldDecorator}
          name="services"
          options={[
            'Регулярное ТО',
            'Замена щёток стеклоочистителя',
            'Долив масла',
          ]}
        />
        <br />
        {getFieldDecorator('otherServices')(
          <TextArea placeholder="Другие услуги" size="large" />
        )}
      </Form.Item>
      <Form.Item label="Выберите желаемую дату и время обслуживания/ремонта">
        {getFieldDecorator(
          'date',
          dateConfig
        )(
          <DatePicker
            size={'large'}
            placeholder="Выберите дату"
            style={{ marginRight: '20px' }}
          />
        )}
        {getFieldDecorator('dayHalf', {
          initialValue: 'am',
        })(
          <Radio.Group buttonStyle="solid" size="large">
            <Radio.Button value="am">До 14:00</Radio.Button>
            <Radio.Button value="pm">После 14:00</Radio.Button>
          </Radio.Group>
        )}
      </Form.Item>
      <Button type="primary" htmlType="submit" size="large">
        Отправить заявку
      </Button>
    </Form>
  );
};
const WrappedRequestForm = Form.create({ name: 'request' })(RequestForm);
const New = () => {
  return (
    <div
      style={{
        background: '#fff',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Title>Новая заявка</Title>
      <WrappedRequestForm />
    </div>
  );
};

export default New;
