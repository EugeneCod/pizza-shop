import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Header } from './components';
import { Home, Cart } from './pages';
import { setPizzas } from './reduxToolkit/pizzas';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:3000/db.json').then(({ data }) => {
      dispatch(setPizzas(data.pizzas));
    });

    // стандартный метод
    // fetch('http://localhost:3000/db.json')
    //   .then((res) => res.json())
    //   .then((json) => setPizzas(json.pizzas))
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path={'/'} exact element={<Home />} />
            <Route path={'/cart'} exact element={<Cart />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

//Вариант для классового компонента
//connect помещает в пропсы компонента
//опр. состояние и действия по его изменеию
// const mapStateToProps = state => {
//   return {
//     items: state.pizzas.items
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setPizzas: (items) => dispatch(setPizzas(items))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
