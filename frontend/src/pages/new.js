import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Typography, Row, Col } from 'antd';
import NewRequestForm from '../components/NewRequestForm';
import SupportPhoneNumber from '../components/SupportPhoneNumber/SupportPhoneNumber';

import { getDealers } from '../redux/getters';

const { Title } = Typography;

const New = ({ dispatch }) => {
  const [formState, setFormState] = useState({});

  const handleChange = (value) => {
    const newState = { ...formState, ...value, loading: true };

    setFormState(newState);
    dispatch(getDealers(newState));
  };

  return (
    <Row
      style={{
        background: '#fff',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Col lg={2} xl={4} xxl={6}></Col>
      <Col lg={20} xl={16} xxl={12}>
        <Row
          gutter={[16, 16]}
          style={{ flexWrap: 'wrap-reverse', marginBottom: '1em' }}
          type="flex"
        >
          <Col xs={24} md={8}>
            <Title level={2} style={{ textAlign: 'center', paddingTop: 15 }}>
              Новая заявка
            </Title>
          </Col>
          <Col xs={24} md={16}>
            <SupportPhoneNumber />
          </Col>
        </Row>
        <NewRequestForm formState={formState} onChange={handleChange} />
      </Col>
      <Col lg={2} xl={4} xxl={6}></Col>
    </Row>
  );
};

export default connect()(New);
