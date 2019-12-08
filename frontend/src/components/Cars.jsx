/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import _ from 'lodash';
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

const Cars = ({ cars, dispatch, clientId }) => {
  React.useEffect(() => {
    dispatch(getCars(clientId));
  }, [clientId]);

  if (!cars) {
    return (
      <Row gutter={16}>
        <Col sm={24} md={12} xl={8}>
          <Card>
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
                      <Text type="secondary">Контракт {car.contract_id}</Text>
                    </p>

                    <Divider style={{ margin: '40px 0' }}>
                      Техническое обслуживание
                    </Divider>
                    <Timeline pending=" " pendingDot={<Icon type="tool" />}>
                      <Timeline.Item
                        dot={
                          <Icon
                            type="clock-circle-o"
                            style={{ fontSize: '16px' }}
                          />
                        }
                        color="red"
                      >
                        <p>Следующее 2015-09-01</p>
                        <p>Пробег 20000 км</p>
                      </Timeline.Item>
                      <Timeline.Item>
                        <p>Последнее 2015-09-01</p>
                        <p>Пробег 10000 км</p>
                      </Timeline.Item>
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

export default connect((state) => ({
  cars: state.cars,
  clientId: state.client.id,
}))(Cars);
