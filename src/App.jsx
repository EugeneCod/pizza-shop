import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import { useDispatch } from 'react-redux';

import { Header } from './components';
import { Home, Cart, NotFound } from './pages';
import { setPizzas } from './reduxToolkit/pizzas';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://63b939b56f4d5660c6e81059.mockapi.io/items')
      .then(({ data }) => {
        console.log(data);
        dispatch(setPizzas(data));
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));

    // стандартный метод
    // fetch('http://localhost:3000/db.json')
    //   .then((res) => res.json())
    //   .then((json) => setPizzas(json.pizzas))
  }, [dispatch]);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path='/' exact element={<Home isLoading={isLoading} />} />
              <Route path='/cart' exact element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
