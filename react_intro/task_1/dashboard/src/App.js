import './App.css';
import logo from './holberton-logo.jpg';
import { getFooterCopy, getFullYear } from './utils';

function App() {
  return (
    <div className="app">
      <header className="App-header">
        <img className="logo" src={logo} alt=""/>
        <h1>School dashboard</h1>
      </header>
      <body className="App-body">
        <p>Login to access the full dashboard</p>
      </body>
      <footer className="App-footer">
        <p>Copyright { getFullYear() } - { getFooterCopy(false) }</p>
      </footer>
    </div>
  );
}

export default App;
