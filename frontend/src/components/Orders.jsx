import React from 'react';
import { Typography } from 'antd';
import { Requests } from './Requests';
import { CompleteOrders } from './CompleteOrders';

const { Title } = Typography;

export const Orders = () => (
  <>
    <div>
      <Title level={3}>Заявки</Title>
      <Requests />
    </div>
    <div>
      <Title level={3}>Выполненные заказы</Title>
      <CompleteOrders />
    </div>
  </>
);
