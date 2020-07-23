import React, { useState, useEffect } from 'react';
import { Context } from '../store';

/**
 * HashRouter 原理
 * 监听 hashchange 事件
 */
const HashRouter = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(getPath());

  const onChangeRoute = () => {
    setCurrentPath(getPath());
  };

  useEffect(() => {
    window.addEventListener('hashchange', onChangeRoute);

    return () => {
      window.removeEventListener('hashchange', onChangeRoute);
    };
  }, []);

  return (
    <Context.Provider value={{ type: 'hash', currentPath, onChange: onChangeRoute }}>
      {children}
    </Context.Provider>
  );
};

export default HashRouter;

function getPath() {
  const paths = window.location.href.split('#');
  console.log('current pathname: ', paths[1]);
  return paths[1];
}
