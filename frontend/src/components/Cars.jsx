import React from 'react';
import { Card, Col, Row, Avatar, Divider } from 'antd';
import BMW from './BMW.png';
import { connect } from 'react-redux';
const { Meta } = Card;

const Cars = ({ cars }) => {
  console.log(cars);
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card>
          <Meta
            avatar={<Avatar shape="square" size="large" src={BMW} />}
            title="BMW X5"
            description="Контракт 0935647"
          />
          <Divider>Техническое обслуживание</Divider>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title">Card content</Card>
      </Col>
      <Col span={8}>
        <Card title="Card title">Card content</Card>
      </Col>
    </Row>
  );
};

export default connect((state) => ({ cars: state.cars }))(Cars);
