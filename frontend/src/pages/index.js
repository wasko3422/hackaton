import React from 'react';
import { Button, Tabs, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import Cars from '../components/Cars';
import { Orders } from '../components/Orders';
import './index.css';

const { TabPane } = Tabs;

const Index = ({ location }) => (
  <>
    <div className="new-item-block">
      <Link to={`/new${location.search}`}>
        <Button type="primary" icon="plus-circle" shape="round" size="large">
          Новая заявка
        </Button>
      </Link>
    </div>
    <Tabs
      defaultActiveKey="1"
      size="large"
      tabBarExtraContent={
        <div className="new-item-tab">
          <Link to={`/new${location.search}`}>
            <Button type="primary" icon="plus-circle" size="large">
              Новая заявка
            </Button>
          </Link>
        </div>
      }
    >
      <TabPane
        tab={
          <div className="tab">
            <Icon type="bars" />
            Заказы
          </div>
        }
        key="1"
      >
        <div className="tab-content">
          <Orders />
        </div>
      </TabPane>
      <TabPane
        tab={
          <div className="tab">
            <Icon type="car" />
            Автомобили
          </div>
        }
        key="2"
      >
        <div className="tab-content">
          <div className="cars-content">
            <Cars />
          </div>
        </div>
      </TabPane>
    </Tabs>
  </>
);

export default withRouter(Index);
