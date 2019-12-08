/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import {
  Card,
  Col,
  Row,
  Divider,
  Skeleton,
  Empty,
  Timeline,
  Icon,
  Typography,
} from 'antd';

import { connect } from 'react-redux';
import { getCars } from '../redux/getters';

import './Cars.css';

const { Title, Text } = Typography;

const Cars = ({ cars, dispatch, location }) => {
  React.useEffect(() => {
    dispatch(getCars(location.search));
  }, [location.search]);

  if (!cars) {
    return (
      <Row gutter={16}>
        <Col sm={24} md={12} xl={8}>
          <Card style={{ marginBottom: 24 }}>
            <Skeleton active paragraph={{ rows: 8 }} />
          </Card>
        </Col>
      </Row>
    );
  }

  if (!cars.length) {
    return (
      <Row gutter={16}>
        <Col span={24}>
          <Empty />
        </Col>
      </Row>
    );
  }

  console.log('cars', cars);

  return (
    <>
      {_.chunk(cars, 3).map((chunk) => {
        return (
          <Row gutter={16} key={chunk.map(({ car_id }) => car_id).join('-')}>
            {chunk.map((car) => {
              return (
                <Col sm={24} md={12} xl={8} key={car.car_id}>
                  <Card style={{ marginBottom: 24 }}>
                    <Row>
                      <Col sm={24} md={12}>
                        <Title level={4} className="cars-name">
                          {car.car_make.toUpperCase()} {car.model}
                        </Title>
                      </Col>
                      <Col sm={24} md={12}>
                        <Title level={4} className="cars-license-plate">
                          {car.car_license_plate.toUpperCase()}
                        </Title>
                      </Col>
                    </Row>
                    <p className="cars-contract">
                      <Text type="secondary">
                        Контракт {car.contract_number}
                      </Text>
                    </p>

                    <Divider style={{ margin: '40px 0' }}>
                      Техническое обслуживание
                    </Divider>
                    <Timeline pending=" " pendingDot={<Icon type="tool" />}>
                      {car.car_next_service &&
                        car.car_next_service.date &&
                        car.car_next_service.mileage && (
                          <Timeline.Item
                            dot={
                              <Icon
                                type="clock-circle-o"
                                style={{ fontSize: '16px' }}
                              />
                            }
                            color="red"
                          >
                            <p>
                              Следующее{' '}
                              {moment(car.car_next_service.date).format(
                                'DD.MM.YYYY'
                              )}
                            </p>
                            <p>Пробег {car.car_next_service.mileage} км</p>
                          </Timeline.Item>
                        )}
                      {car.car_last_service &&
                        car.car_last_service.date &&
                        car.car_last_service.mileage && (
                          <Timeline.Item>
                            <p>
                              Следующее{' '}
                              {moment(car.car_last_service.date).format(
                                'DD.MM.YYYY'
                              )}
                            </p>
                            <p>Пробег {car.car_last_service.mileage} км</p>
                          </Timeline.Item>
                        )}
                    </Timeline>
                  </Card>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </>
  );
};

export default withRouter(
  connect((state) => ({
    cars: state.cars,
    clientId: state.client.id,
  }))(Cars)
);
