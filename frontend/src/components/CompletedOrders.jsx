/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Table, Tag } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'job_done_id',
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
    dataIndex: 'job_done.mileage',
  },
  {
    title: 'Перечень работ',
    dataIndex: 'job_done.jobs',
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
    <Table columns={columns} dataSource={completedOrders} onChange={onChange} />
  );
};

export default connect((state) => ({
  completedOrders: state.completedOrders,
  clientId: state.client.id,
}))(CompletedOrders);
