import React from 'react';
import { PageHeader } from 'antd';
import logo from './logo.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';

const Header = () => {
  return (
    <PageHeader
      className="header"
      title={
        <Link to="/">
          <img src={logo} height={40} alt="ALD" />
        </Link>
      }
    />
  );
};

export default Header;
