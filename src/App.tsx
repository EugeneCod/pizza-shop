import Loadable from 'react-loadable';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
// При lazy loading страницы при помощи встроенной функции React.lazy нужный компоент оборачивается в <Suspense />
// В <Suspense /> передается fallback(разметка, размещаемая до окончания загрузки страницы)
// const Cart = lazy(() => import(/* webpackChunkName: 'CartPage' */'./pages/Cart'));
const NotFound = lazy(() => import(/* webpackChunkName: 'NotFoundPage' */ './pages/NotFound'));
const FullPizza = lazy(
  () => import(/* webpackChunkName: 'FullPizzaPage' */ './pages/FullPizza/FullPizza'),
);

// Библиотека react-loadable применяется при необходимости серверного рендеринга,
// т.к. React.lazy не имеет функционала для этого
const Cart = Loadable({
  loader: () => import(/* webpackChunkName: 'CartPage' */ './pages/Cart'),
  loading: () => <div>Загрузка корзины...</div>,
});

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="pizza/:id"
            element={
              <Suspense fallback={<div>Загрузка товара...</div>}>
                <FullPizza />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Загрузка страницы...</div>}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
