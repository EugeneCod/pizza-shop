import { Route, Routes } from 'react-router-dom';

import { FullPizza } from './components';
import MainLayout from './layouts/MainLayout';
import { Home, Cart, NotFound } from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" exact element={<Home />} />
          <Route path="cart" exact element={<Cart />} />
          <Route path="pizza/:id" exact element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
