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
    <div
      style={{
        background: '#fff',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Row
        type="flex"
        justify="space-between"
        gutter={[16, 16]}
        style={{ marginBottom: '1em' }}
      >
        <Col>
          <Title>Новая заявка</Title>
        </Col>
        <Col>
          <SupportPhoneNumber />
        </Col>
      </Row>
      <NewRequestForm formState={formState} onChange={handleChange} />
    </div>
  );
};

export default connect()(New);
