import React from 'react';
import Link from '../../components/Link';

const Home = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h3>this is home page</h3>
      <Link className="App-link" to="/hello">
        go to hello
      </Link>
    </div>
  );
};

export default Home;
