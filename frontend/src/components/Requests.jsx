/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
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
    sorter: (a, b) => a.order_id - b.order_id,
  },
  {
    title: 'Автомобиль',
    dataIndex: 'car',
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
    width: 100,
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
  {
    title: 'Дата создания заявки',
    dataIndex: 'order.created_at',
    defaultSortOrder: 'descend',
    width: 180,
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
      return date ? moment(date).format('DD.MM.YYYY') : '-';
    },
  },
  {
    title: 'Предполагаемая дата',
    dataIndex: 'order.date_expected',
    width: 180,
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
      return date ? moment(date).format('DD.MM.YYYY') : '-';
    },
  },
  {
    title: 'Дилер',
    dataIndex: 'order.dealer_name',
  },
  {
    title: 'Статус',
    dataIndex: 'order.status',
    width: 140,
    render: (status) => {
      if (status === 'created') {
        return <Tag color="geekblue">Создана</Tag>;
      }
      if (status === 'sent') {
        return <Tag color="green">Отправлена дилеру</Tag>;
      }
      if (status === 'in_progress') {
        return <Tag color="orange">В обработке</Tag>;
      }
      if (status === 'declined') {
        return <Tag color="red">Отклонено</Tag>;
      }
      return status;
    },
  },
];

function getRequests(search) {
  return (dispatch) => {
    axios.get(`/get-orders${search}`).then((res) =>
      dispatch({
        type: 'FETCH_REQUESTS',
        payload: res.data || [],
      })
    );
  };
}

const Requests = ({ requests, dispatch, location }) => {
  React.useEffect(() => {
    dispatch(getRequests(location.search));
  }, [location.search]);

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

  console.log('requests', requests);

  return (
    <Table
      columns={filteredColumns}
      scroll={{ x: 1600 }}
      rowKey={(record) => record.order_id}
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

export default withRouter(
  connect((state) => ({
    requests: state.requests,
    clientId: state.client.id,
  }))(Requests)
);
