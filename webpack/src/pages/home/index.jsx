import React from 'react';
import { Button } from 'antd';
import Title from '@/components/text';
import logo from '@/assets/logo.svg';
import './style.less';

function Home() {
  return (
    <div className="app">
      <img src={logo} alt="logo" className="logo" />
      <Title text="Hello, Webpack!!!" />
      <Button type="primary">GOT IT!</Button>
    </div>
  );
}

export default Home;
