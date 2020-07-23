import React from 'react';
import logo from './assets/logo.svg';
import BrowserRouter from './components/BrowserRouter';
import HashRouter from './components/HashRouter';
import Route from './components/Route';
import Home from './pages/home';
import Hello from './pages/hello';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <HashRouter>
          <Route path="/home" component={<Home />} />
          <Route path="/hello" component={<Hello />} />
        </HashRouter>
      </header>
    </div>
  );
}

export default App;
