/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'order_id',
    sorter: (a, b) => a - b,
  },
  {
    title: 'Автомобиль',
    dataIndex: 'car.car_license_plate',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Пробег',
    dataIndex: 'order.mileage',
  },
  {
    title: 'Перечень работ',
    dataIndex: 'order.jobs',
    render: (jobs, _, index) => {
      if (!jobs.length) {
        return <span>-</span>;
      }
      return (
        <span key={index}>
          {jobs.map((job) => {
            return <Tag key={job}>{job.toUpperCase()}</Tag>;
          })}
        </span>
      );
    },
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

function getRequests(clientId) {
  return (dispatch) => {
    axios.get(`/get-orders?client_id=${clientId}`).then((res) =>
      dispatch({
        type: 'FETCH_REQUESTS',
        payload: res.data || [],
      })
    );
  };
}

const Requests = ({ requests, dispatch, clientId }) => {
  React.useEffect(() => {
    dispatch(getRequests(clientId));
  }, [clientId]);

  console.log('requests', requests);

  return (
    <Table
      columns={columns}
      dataSource={requests}
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
  requests: state.requests,
  clientId: state.client.id,
}))(Requests);
