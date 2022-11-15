import { Route, Routes } from 'react-router-dom';
import { Header } from './components';
import { Home, Cart } from './pages';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
          <Route
            path={'/'}
            exact
            element={<Home />}
          />
          <Route
            path={'/cart'}
            exact
            element={<Cart />}
          />
          </Routes>
          {/* <Home /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
