import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Form, Input, DatePicker, Radio, Button, Row } from 'antd';
import { CustomSelect } from '../components/Selects';
import { CheckboxGroup } from '../components/CheckboxGroup';
import DealersMap, { ACCESS_TOKEN } from './DealersMap/DealersMap';

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

function getCityCoords(query, accessToken) {
  return (dispatch) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&access_token=${accessToken}`
      )
      .then((res) =>
        dispatch({
          type: 'FETCH_CITY_COORDS',
          payload: res.data || [],
        })
      );
  };
}

function getCities() {
  return (dispatch) => {
    axios.get('/get-cities').then((res) =>
      dispatch({
        type: 'FETCH_CITIES',
        payload: res.data || [],
      })
    );
  };
}

class NewRequestForm extends Component {
  componentDidMount() {
    this.props.dispatch(getCities());
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
        date: fieldsValue['date'].format('YYYY-MM-DD'),
      };
      console.log('Received values of form: ', values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { cities, cityCoords } = this.props;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Выберите автомобиль" required>
          {getFieldDecorator('carNumber', {
            rules: [
              {
                required: true,
                message: 'Обязательное поле',
              },
            ],
          })(<CustomSelect options={[]} size="large" />)}
        </Form.Item>
        <Form.Item label="Выберите город обслуживания" required>
          {getFieldDecorator('city', {
            rules: [
              {
                required: true,
                message: 'Обязательное поле',
              },
            ],
          })(
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
              onChange={(label) => {
                this.props.dispatch(getCityCoords(label, ACCESS_TOKEN));
              }}
            />
          )}
        </Form.Item>
        {cityCoords && cityCoords.features[0] && (
          <Form.Item wrapperCol={{ span: 24 }} label="Выберите дилера">
            <DealersMap />
          </Form.Item>
        )}
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
const CreatedForm = Form.create({ name: 'request' })(NewRequestForm);

export default connect((state) => ({
  cities: state.cities,
  cityCoords: state.cityCoords,
  clientId: state.client.id,
}))(CreatedForm);
