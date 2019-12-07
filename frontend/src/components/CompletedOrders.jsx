/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';

import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'job_done_id',
    width: 100,
  },
  {
    title: 'Автомобиль',
    dataIndex: 'car',
    defaultSortOrder: 'descend',
    render: ({ make, model, car_license_plate }, _, index) => {
      return `${make.toUpperCase()} ${model} / ${car_license_plate.toUpperCase()}`;
    },
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Пробег',
    dataIndex: 'job_done.mileage',
  },
  {
    title: 'Дата выполнения заказа',
    dataIndex: 'job_done.date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }

      return 0;
    },
    render: (date) => {
      return moment(date).format('DD.MM.YYYY');
    },
  },
  {
    title: 'Дилер',
    dataIndex: 'job_done.dealer_name',
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

function getCompletedOrders(clientId) {
  return (dispatch) => {
    axios.get(`/get-jobs-done?client_id=${clientId}`).then((res) =>
      dispatch({
        type: 'FETCH_COMPLETED_ORDERS',
        payload: res.data || [],
      })
    );
  };
}

const CompletedOrders = ({ completedOrders, dispatch, clientId }) => {
  React.useEffect(() => {
    dispatch(getCompletedOrders(clientId));
  }, [clientId]);

  console.log('completedOrders', completedOrders);

  return (
    <Table
      scroll={{ x: 992 }}
      columns={columns}
      dataSource={completedOrders}
      onChange={onChange}
      pagination={{
        style: {
          marginRight: 15,
        },
      }}
    />
  );
};

export default connect((state) => ({
  completedOrders: state.completedOrders,
  clientId: state.client.id,
}))(CompletedOrders);
