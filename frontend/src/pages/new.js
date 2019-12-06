import React from "react";
import { Form } from "antd";

import { CustomSelect } from "../components/CustomSelect";

const New = () => {
  return (
    <Form layout="vertical">
      <Form.Item label="Укажите гос. номер автомобиля" required>
        <CustomSelect placeholder="x000xx" options={[]} />
      </Form.Item>
      <Form.Item label="Выберите город обслуживания" required>
        <CustomSelect placeholder="Город" options={["Москва", "Питер"]} />
      </Form.Item>
    </Form>
  );
};

export default New;
