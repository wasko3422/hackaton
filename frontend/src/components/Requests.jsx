/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Table, Tag } from 'antd';

const getCarName = (car) => {
  return `${car.make.toUpperCase()} ${
    car.model
  } / ${car.car_license_plate.toUpperCase()}`;
};

const columns = [
  {
    title: 'ID',
    dataIndex: 'order_id',
    width: 100,
  },
  {
    title: 'Автомобиль',
    dataIndex: 'car',
    defaultSortOrder: 'descend',
    render: getCarName,
    width: 350,
    sorter: (a, b) => {
      const nameA = getCarName(a.car);
      const nameB = getCarName(b.car);
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    },
    onFilter: (value, record) => {
      return `${record.car.make.toUpperCase()} ${record.car.model}` === value;
    },
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

  const filteredColumns = columns.map((column) => {
    if (column.dataIndex === 'car' && requests) {
      return {
        ...column,
        filters: requests.reduce((acc, record) => {
          const name = `${record.car.make.toUpperCase()} ${record.car.model}`;
          if (acc.some((filter) => filter.value === name)) {
            return acc;
          }
          return acc.concat({
            text: name,
            value: name,
          });
        }, []),
      };
    }
    return column;
  });

  return (
    <Table
      columns={filteredColumns}
      dataSource={requests}
      loading={!requests}
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
