import React from 'react';
import Link from '../../components/Link';

const Hello = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>this is hello page</h3>
      <Link className="App-link" to="/home">
        go to home
      </Link>
    </div>
  );
};

export default Hello;
