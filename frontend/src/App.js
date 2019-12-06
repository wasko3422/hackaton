import React from "react";
import Index from "./pages/index";
import New from "./pages/new";
import Map from "./pages/map";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Layout, Menu } from "antd";

const { Header, Footer, Content } = Layout;

export default function App() {
  return (
    <Router>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal" className="menu">
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/new">New</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/map">Map</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
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
