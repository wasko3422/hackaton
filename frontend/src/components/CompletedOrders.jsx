/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import axios from 'axios';
import moment from 'moment';
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
    dataIndex: 'job_done_id',
    width: 100,
  },
  {
    title: 'Автомобиль',
    dataIndex: 'car',
    defaultSortOrder: 'descend',
    render: getCarName,
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

  const filteredColumns = columns.map((column) => {
    if (column.dataIndex === 'car' && completedOrders) {
      return {
        ...column,
        filters: completedOrders.reduce((acc, record) => {
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
      scroll={{ x: 992 }}
      columns={filteredColumns}
      dataSource={completedOrders}
      onChange={onChange}
      loading={!completedOrders}
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
