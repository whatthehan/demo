import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Menu } from 'antd';

const { SubMenu, Item } = Menu;

export default function MenuConfig({ children }) {
  useEffect(() => {
    return () => {
      console.log('unmount');
    };
  }, []);

  return (
    <div>
      <Menu mode="horizontal" theme="dark">
        <Item key="/">
          <Link to="/">a</Link>
        </Item>
        <Item key="/b">
          <Link to="/b">b</Link>
        </Item>
        <SubMenu title="other">
          <Item key="/other/a">
            <Link to="/">a</Link>
          </Item>
          <Item key="/other/b">
            <Link to="/b">b</Link>
          </Item>
        </SubMenu>
      </Menu>
      {children}
    </div>
  );
}
