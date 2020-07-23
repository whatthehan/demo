import React from 'react';

const Context = React.createContext({
  type: 'default',
  currentPath: window.location.pathname,
  onChange: () => null,
});

export { Context };
