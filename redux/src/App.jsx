import React from 'react';
import logo from './logo.svg';

import { useSelector, useDispatch } from './react-redux';

function App() {
  const { count } = useSelector((state) => state);
  const dispatch = useDispatch();

  const increase = () => {
    dispatch({ type: 'increase' });
  };

  const subtract = () => {
    dispatch({ type: 'subtract' });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>当前count: {count}</h2>
        <div>
          <button onClick={increase} style={{ marginRight: 20 }}>
            加1
          </button>
          <button onClick={subtract}>减1</button>
        </div>
      </header>
    </div>
  );
}

export default App;
