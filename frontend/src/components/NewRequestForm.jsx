import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';

import { Form, Input, InputNumber, DatePicker, Radio, Button, Row } from 'antd';
import { CustomSelect } from '../components/Selects';
import { CheckboxGroup } from '../components/CheckboxGroup';
import DealersMap, { ACCESS_TOKEN } from './DealersMap/DealersMap';
import { getCars, getCities, getCityCoords, getJobs } from '../redux/getters';

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

const options = {
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
};

const required = {
  rules: [
    {
      required: true,
      message: 'Обязательное поле',
    },
  ],
};

class NewRequestForm extends Component {
  componentDidMount() {
    const { cars, location } = this.props;
    if (!cars) {
      this.props.dispatch(getCars(location.search));
    }
    this.props.dispatch(getCities());
    this.props.dispatch(getJobs());
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { validateFields } = this.props.form;

    validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        date: fieldsValue['date'] && fieldsValue['date'].format('YYYY-MM-DD'),
      };
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { cars, cities, cityCoords, jobs, formState } = this.props;
    const { cityId, carId } = formState;
    const isMapShown = cityCoords && cityCoords.features[0] && carId && cityId;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Выберите автомобиль" required>
          {getFieldDecorator(
            'carId',
            required
          )(
            <CustomSelect
              options={
                !cars
                  ? []
                  : cars.map(
                      ({ car_id, car_make, car_model, car_license_plate }) => ({
                        value: car_id,
                        label: cn(car_make, car_model, car_license_plate),
                      })
                    )
              }
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item label="Выберите город обслуживания" required>
          {getFieldDecorator(
            'cityId',
            required
          )(
            <CustomSelect
              placeholder="Город"
              options={
                cities
                  ? cities.map(({ city_id, city_name }) => ({
                      value: city_id,
                      label: city_name,
                    }))
                  : []
              }
              size="large"
              onChange={(value) => {
                const query = cities.find(({ city_id }) => city_id === value)
                  .city_name;
                this.props.dispatch(getCityCoords(query, ACCESS_TOKEN));
              }}
            />
          )}
        </Form.Item>
        {isMapShown && (
          <Form.Item wrapperCol={{ span: 24 }} label="Выберите дилера">
            {getFieldDecorator('dealerId')(<DealersMap />)}
          </Form.Item>
        )}
        <Form.Item label="Укажите текущий пробег автомобиля">
          {getFieldDecorator('kilometrage')(
            <InputNumber
              size="large"
              placeholder="Пробег, км"
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
        <Form.Item label="Выберите услуги, в которых нуждается автомобиль">
          <Row>
            <CheckboxGroup
              getFieldDecorator={getFieldDecorator}
              name="services"
              options={
                !jobs
                  ? []
                  : jobs.map(({ job_type_id, job_type }) => ({
                      value: job_type_id,
                      label: job_type,
                    }))
              }
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
        <Form.Item label="Имя">
          {getFieldDecorator(
            'firstName',
            required
          )(<Input type="text" size="large" />)}
        </Form.Item>
        <Form.Item label="Фамилия">
          {getFieldDecorator(
            'lastName',
            required
          )(<Input type="text" size="large" />)}
        </Form.Item>
        <Form.Item label="Телефон">
          {getFieldDecorator(
            'phoneNumber',
            required
          )(<InputNumber size="large" style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator(
            'email',
            required
          )(<Input type="email" size="large" />)}
        </Form.Item>
        <Button type="primary" htmlType="submit" size="large">
          Отправить заявку
        </Button>
      </Form>
    );
  }
}
const CreatedForm = Form.create({ name: 'request', ...options })(
  NewRequestForm
);

export default withRouter(
  connect((state) => ({
    cars: state.cars,
    cities: state.cities,
    cityCoords: state.cityCoords,
    jobs: state.jobs,
    clientId: state.client.id,
  }))(CreatedForm)
);
