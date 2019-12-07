import React from 'react';
import { Button, Tabs, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';

const { TabPane } = Tabs;

const Index = () => (
  <>
    <div className="new-item-block">
      <Link to="/new">
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
          <Link to="/new">
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
            <Icon type="car" />
            Автомобили
          </div>
        }
        key="1"
      />
      <TabPane
        tab={
          <div className="tab">
            <Icon type="bars" />
            Заказы
          </div>
        }
        key="2"
      />
    </Tabs>

    <div
      style={{
        background: '#fff',
        padding: 24,
        minHeight: 280,
        marginTop: -16,
      }}
    >
      Content
    </div>
  </>
);

export default Index;
