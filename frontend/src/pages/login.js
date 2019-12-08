import React from 'react';
import { Form, Icon, Input, Button, Typography, Row, Col, Card } from 'antd';
import './login.css';
const { Title } = Typography;

class ManagerLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        window.location.replace(`/?client_id=${values.client}`);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('client', {
            rules: [
              { required: true, message: 'Пожалуйста, введите номер клиента' },
            ],
          })(
            <Input
              prefix={
                <Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Номер клиента"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

class DriverLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        window.location.replace(`/?contract_id=${values.contract}`);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('contract', {
            rules: [
              {
                required: true,
                message: 'Пожалуйста, введите номер контракта',
              },
            ],
          })(
            <Input
              prefix={<Icon type="car" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Номер контракта"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

class AdminLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        window.location.replace('/administrate');
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Пожалуйста, введите логин' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Логин"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Пожалуйста, введите пароль' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Пароль"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="danger"
            size="large"
            htmlType="submit"
            className="login-form-button"
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const ManagerLogin = Form.create({ name: 'manager' })(ManagerLoginForm);
const DriverLogin = Form.create({ name: 'driver' })(DriverLoginForm);
const AdminLogin = Form.create({ name: 'admin' })(AdminLoginForm);

const Login = () => {
  return (
    <Row gutter={[16, 16]} className="login-box">
      <Col xs={24} md={12} lg={8}>
        <Card title="Управляющий автопарком">
          <ManagerLogin />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Пользователь автомобиля">
          <DriverLogin />
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Управление заявками">
          <AdminLogin />
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
