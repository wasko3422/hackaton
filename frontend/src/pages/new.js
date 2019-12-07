import React from 'react';
import { Typography } from 'antd';
import NewRequestForm from '../components/NewRequestForm';

const { Title } = Typography;

const New = () => {
  return (
    <div
      style={{
        background: '#fff',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Title>Новая заявка</Title>
      <NewRequestForm />
    </div>
  );
};

export default New;
