import React from 'react';
import axios from 'axios';
import Index from './pages/index';
import New from './pages/new';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Layout, PageHeader, ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';

const { Footer, Content } = Layout;

export default function App() {
  // Make a request for a user with a given ID
  axios
    .get('/get-cities')
    .then(function(response) {
      // handle success
      console.log(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    })
    .finally(function() {
      // always executed
    });
  return (
    <ConfigProvider locale={ruRU}>
      <Router>
        <Layout className="layout">
          <PageHeader
            className="header"
            title={
              <Link to="/">
                <img src={logo} height={40} />
              </Link>
            }
          />
          <Content className="content">
            <Switch>
              <Route path="/new">
                <New />
              </Route>
              <Route path="/" exact>
                <Index />
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Rosbank Tech.Madness ©2019 Created by Island Pilots
          </Footer>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}
