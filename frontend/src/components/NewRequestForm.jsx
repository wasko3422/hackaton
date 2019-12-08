import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import qs from 'qs';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Checkbox,
  Radio,
  Button,
  Row,
  message,
} from 'antd';
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
    md: { span: 12 },
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
  state = {
    loading: false,
    submitDisabled: true,
  };

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
      const query = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      });

      const contractId =
        query.contract_id ||
        this.props.cars.find(({ car_id }) => {
          return car_id === fieldsValue['carId'];
        }).contract_id;

      const values = {
        client_id: query.client_id,
        city_id: fieldsValue['cityId'],
        contract_id: contractId,
        car_id: fieldsValue['carId'],
        mileage: fieldsValue['mileage'],
        dealer_id: fieldsValue['dealerId'],
        job_types: fieldsValue['services'],
        comment: fieldsValue['comment'],
        date_expected:
          fieldsValue['date'] && fieldsValue['date'].format('YYYY-MM-DD'),
        part_of_day_expected: fieldsValue['partOfDay'],
        name: fieldsValue['firstName'],
        surname: fieldsValue['lastName'],
        phone: fieldsValue['phoneNumber'],
        email: fieldsValue['email'],
      };

      const hide = message.loading('Отправка..', 0);
      this.setState({
        loading: true,
      });

      const timeout = new Promise(function(resolve, reject) {
        setTimeout(resolve, 3000);
      });

      Promise.race([axios.post(`/create-order`, values), timeout]).then(
        function(value) {
          hide();
          const hideSuccess = message.success('Заявка создана успешно', 0);
          setTimeout(() => {
            hideSuccess();
            window.location.href = `/${window.location.search}`;
          }, 2000);
        }
      );
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
          {getFieldDecorator('mileage')(
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
            {getFieldDecorator('comment')(
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
                  format="DD.MM.YYYY"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('partOfDay', {
                initialValue: '1',
              })(
                <Radio.Group buttonStyle="solid" size="large">
                  <Radio.Button value="1">До 14:00</Radio.Button>
                  <Radio.Button value="2">После 14:00</Radio.Button>
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
        <Form.Item>
          {getFieldDecorator(
            'confirm',
            required
          )(
            <Checkbox
              style={{ fontSize: '16px' }}
              onChange={({ target }) => {
                this.setState({ submitDisabled: !target.checked });
              }}
            >
              Согласие на обработку персональных данных
            </Checkbox>
          )}
        </Form.Item>
        <Button
          loading={this.state.loading}
          disabled={this.state.submitDisabled}
          type="primary"
          htmlType="submit"
          size="large"
        >
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
