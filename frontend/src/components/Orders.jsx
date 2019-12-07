import React from 'react';
import { Typography } from 'antd';
import Requests from './Requests';
import CompletedOrders from './CompletedOrders';
import './Orders.css';

const { Title } = Typography;

export const Orders = () => (
  <>
    <div className="orders-block">
      <Title level={3} className="orders-title">
        Заявки
      </Title>
      <Requests />
    </div>
    <div className="orders-block">
      <Title level={3} className="orders-title">
        Выполненные заказы
      </Title>
      <CompletedOrders />
    </div>
  </>
);
