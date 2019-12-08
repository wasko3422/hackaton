import React from 'react';
import axios from 'axios';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import Index from './pages/index';
import Login from './pages/login';
import Header from './components/Header';
import New from './pages/new';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Layout, ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const { Footer, Content } = Layout;

const store = createStore(reducer, applyMiddleware(thunk));

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
      <Provider store={store}>
        <Router>
          <Layout className="layout">
            <Header />
            <Switch>
              <Route path="/login">
                <Content className="content">
                  <Login />
                </Content>
              </Route>
              <Route path="/new">
                <Content className="content">
                  <New />
                </Content>
              </Route>
              <Route path="/" exact>
                <Content className="content">
                  <Index />
                </Content>
              </Route>
            </Switch>

            <Footer style={{ textAlign: 'center' }}>
              Rosbank Tech.Madness ©2019 Created by Island Pilots
            </Footer>
          </Layout>
        </Router>
      </Provider>
    </ConfigProvider>
  );
}
