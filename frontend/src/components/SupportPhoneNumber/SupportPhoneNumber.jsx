import React from 'react';
import { Icon, Typography } from 'antd';

import './SupportPhoneNumber.css';

const { Text } = Typography;

const SupportPhoneNumber = () => (
  <div className="support">
    <Text>Позвоните нам, если хотите оставить заявку по телефону</Text>
    <a href="tel:8 800 505 04 03" className="phone-number">
      <Icon type="phone" /> 8 800 505 04 03
    </a>
  </div>
);

export default SupportPhoneNumber;
