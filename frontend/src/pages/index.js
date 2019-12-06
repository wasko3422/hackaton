import React from 'react';
import { Button, Tabs, Icon } from 'antd';
import './index.css';

const { TabPane } = Tabs;

const Index = () => (
  <>
    <Tabs
      defaultActiveKey="1"
      size="large"
      tabBarExtraContent={
        <div style={{ marginRight: 20 }}>
          <Button type="primary" icon="plus-circle" size="large">
            Новая заявка
          </Button>
        </div>
      }
    >
      <TabPane
        tab={
          <div style={{ width: '20vw', textAlign: 'center' }}>
            <Icon type="car" />
            Автомобили
          </div>
        }
        key="1"
      />
      <TabPane
        tab={
          <div style={{ width: '20vw', textAlign: 'center' }}>
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
