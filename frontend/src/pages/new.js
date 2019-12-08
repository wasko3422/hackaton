import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import NewRequestForm from '../components/NewRequestForm';
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
      <Title>Новая заявка</Title>
      <NewRequestForm formState={formState} onChange={handleChange} />
    </div>
  );
};

export default connect()(New);
