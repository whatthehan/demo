import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import Title from '@/component/text';
import './style.less';

@withRouter
class App extends React.Component {
  static displayName = 'app';

  render() {
    return (
      <div className="app">
        <Title text="Hello, Webpack!!!" />
        <Button type="primary">GOT IT!</Button>
      </div>
    );
  }
}

export default App;
