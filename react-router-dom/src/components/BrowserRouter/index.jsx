import React, { useState, useEffect } from 'react';
import { Context } from '../store';

/**
 * BrowserRouter 原理
 * 监听popstate事件
 * 通过Consumer Provider通信
 */
const BrowserRouter = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const onChangeRoute = () => {
    console.log('current pathname: ', window.location.pathname);
    setCurrentPath(window.location.pathname);
  };

  useEffect(() => {
    window.addEventListener('popstate', onChangeRoute);

    return () => {
      window.removeEventListener('popstate', onChangeRoute);
    };
  }, []);

  return (
    <Context.Provider value={{ type: 'default', currentPath, onChange: onChangeRoute }}>
      {children}
    </Context.Provider>
  );
};

export default BrowserRouter;
