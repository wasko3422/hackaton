import React from "react";
import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button
} from "antd";
import "./index.css";

const { Option } = Select;

const Index = () => (
  <>
    <section style={{ textAlign: "center" }}>
      <h1 style={{ textAlign: "center" }}>Ant Design</h1>
      <img
        style={{ width: "40px", height: "40px" }}
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
    </section>
    <Form style={{ marginTop: 32 }}>
      <Form.Item label="text" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <InputNumber min={1} max={10} defaultValue={3} />
        <span className="ant-form-text">text</span>
        <a href="https://ant.design">text</a>
      </Form.Item>
      <Form.Item label="text" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item label="text" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Slider defaultValue={70} />
      </Form.Item>
      <Form.Item label="text" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Select defaultValue="lucy" style={{ width: 192 }}>
          <Option value="jack">jack</Option>
          <Option value="lucy">lucy</Option>
          <Option value="disabled" disabled>
            disabled
          </Option>
          <Option value="yiminghe">yiminghe</Option>
        </Select>
      </Form.Item>
      <Form.Item label="text" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <DatePicker />
      </Form.Item>
      <Form.Item></Form.Item>
      <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          text
        </Button>
        <Button style={{ marginLeft: 8 }}>text</Button>
      </Form.Item>
    </Form>
  </>
);

export default Index;
