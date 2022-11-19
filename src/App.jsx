import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { Header } from './components';
import { Home, Cart } from './pages';

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect (() => {
    axios.get('http://localhost:3000/db.json')
      .then(({ data }) => {
        return setPizzas(data.pizzas)
      })

    // стандартный метод
    // fetch('http://localhost:3000/db.json')
    //   .then((res) => res.json())
    //   .then((json) => setPizzas(json.pizzas))
  }, [])

  

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
          <Route
            path={'/'}
            exact
            element={<Home 
              pizzas={pizzas}
            />}
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
