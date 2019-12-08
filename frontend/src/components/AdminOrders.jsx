/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react';
import axios from 'axios';
import moment from 'moment';
import qs from 'qs';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Table, Tag, Popconfirm, message } from 'antd';
import AdminOrderEdit from './AdminOrderEdit';

import './AdminOrders.css';

const confirm = (order_id, dispatch) => (e) => {
  console.log(e);
  const hide = message.loading('Удаление..', 0);

  axios
    .get(`/m-delete-order?order_id=${order_id}`)
    .then(() => {
      hide();
      message.success('Удалено');
      dispatch({
        type: 'DELETE_ADMIN_ORDER',
        payload: order_id,
      });
    })
    .catch(() => {
      hide();
      message.error('Ошибка');
    });
};

const getCarName = (car) => {
  return `${car.make.toUpperCase()} ${
    car.model
  } / ${car.car_license_plate.toUpperCase()}`;
};

const getColumns = (dispatch) => [
  {
    title: 'ID',
    dataIndex: 'order_id',
    width: 100,
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.order_id - b.order_id,
  },
  {
    title: 'Контракт',
    dataIndex: 'contract_id',
    width: 100,
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
    title: 'Город',
    dataIndex: 'city_name',
    width: 100,
  },
  {
    title: 'Дилер',
    dataIndex: 'order.dealer_name',
    width: 250,
  },
  {
    title: 'ТО',
    dataIndex: 'order.main_service',
    width: 70,
    render: (service) => {
      if (service) {
        return 'Да';
      }
      return 'Нет';
    },
  },
  {
    title: 'Перечень работ',
    dataIndex: 'order.jobs',
    render: (jobs) => {
      if (!jobs || !jobs.length) {
        return '-';
      }
      return jobs.map(({ job_name }) => job_name).join(', ');
    },
  },
  {
    title: 'Статус',
    dataIndex: 'order.status',
    width: 165,
    render: (status) => {
      if (status === 'created') {
        return <Tag color="geekblue">Создана</Tag>;
      }
      if (status === 'sent') {
        return <Tag color="green">Отправлена дилеру</Tag>;
      }
      if (status === 'in_progress') {
        return <Tag color="orange">В работе</Tag>;
      }
      if (status === 'declined') {
        return <Tag color="red">Отклонено</Tag>;
      }
      return status;
    },
  },
  {
    title: 'Дата создания заявки',
    dataIndex: 'order.created_at',
    width: 180,
    render: (date) => {
      return date ? moment(date).format('DD.MM.YYYY') : '-';
    },
  },
  {
    title: 'Предполагаемая дата',
    dataIndex: 'order.date_expected',
    width: 180,
    render: (date) => {
      return date ? moment(date).format('DD.MM.YYYY') : '-';
    },
  },
  {
    title: 'Действия',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (_, { order_id }) => (
      <span>
        <Link to={`/administrate?edit=${order_id}`}>изменить</Link>
        <br />
        <Popconfirm
          title="Вы уверены?"
          onConfirm={confirm(order_id, dispatch)}
          okText="Да"
          cancelText="Нет"
          placement="bottomRight"
        >
          <a style={{ color: '#f5222d' }}>удалить</a>
        </Popconfirm>
      </span>
    ),
  },
];

function getAdminOrders(clientId) {
  return (dispatch) => {
    axios.get(`/m-get-orders?client_id=${clientId}`).then((res) =>
      dispatch({
        type: 'FETCH_ADMIN_ORDERS',
        payload: res.data || [],
      })
    );
  };
}

const AdminOrders = ({ adminOrders, dispatch, clientId, location }) => {
  React.useEffect(() => {
    dispatch(getAdminOrders(clientId));
  }, [clientId]);

  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (query.edit && adminOrders) {
    const orderForEdit = adminOrders.find(
      ({ order_id }) => `${order_id}` === query.edit
    );

    console.log('orderForEdit', orderForEdit);

    if (orderForEdit) {
      return <AdminOrderEdit order={orderForEdit} />;
    }
  }
  const filteredColumns = getColumns(dispatch).map((column) => {
    if (column.dataIndex === 'car' && adminOrders) {
      return {
        ...column,
        filters: adminOrders.reduce((acc, record) => {
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

  console.log('adminOrders', adminOrders);

  return (
    <Table
      columns={filteredColumns}
      scroll={{ x: 1900 }}
      rowKey={(record) => record.order_id}
      dataSource={adminOrders}
      loading={!adminOrders}
      bordered
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
    adminOrders: state.adminOrders,
    clientId: state.client.id,
  }))(AdminOrders)
);
