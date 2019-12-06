import React from 'react';
import Index from './pages/index';
import New from './pages/new';
import Map from './pages/map';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Layout, PageHeader } from 'antd';

const { Footer, Content } = Layout;

export default function App() {
  return (
    <Router>
      <Layout className="layout">
        <PageHeader
          style={{
            backgroundColor: '#fff',
          }}
          title={<img src={logo} height={40} />}
        />
        <Content className="content">
          <Switch>
            <Route path="/new">
              <New />
            </Route>
            <Route path="/map">
              <Map />
            </Route>
            <Route path="/">
              <Index />
            </Route>
          </Switch>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Router>
  );
}
