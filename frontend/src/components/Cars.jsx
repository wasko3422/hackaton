/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import {
  Card,
  Col,
  Row,
  Avatar,
  Divider,
  Skeleton,
  Empty,
  Timeline,
  Icon,
} from 'antd';

import { connect } from 'react-redux';
const { Meta } = Card;

const Cars = ({ cars, dispatch, clientId }) => {
  function getCars() {
    return (dispatch) => {
      axios.get(`/get-cars?client_id=${clientId}`).then((res) =>
        dispatch({
          type: 'FETCH_CARS',
          payload: res.data || [],
        })
      );
    };
  }

  React.useEffect(() => {
    dispatch(getCars());
  }, []);

  if (!cars) {
    return (
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Skeleton avatar active paragraph={{ rows: 4 }} />
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
                <Col span={8} key={car.car_id}>
                  <Card>
                    <Meta
                      avatar={
                        <Avatar
                          shape="square"
                          size="large"
                          src={car.car_logo_url}
                        />
                      }
                      title={car.car_make}
                      description={`Контракт ${car.contract_id}`}
                    />
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
