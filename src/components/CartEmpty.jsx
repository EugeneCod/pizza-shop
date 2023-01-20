import React from 'react';
import cartEmptyImage from '../assets/img/empty-cart.png';
import { NavLink } from 'react-router-dom';

function CartEmpty() {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Корзина пустая 😕</h2>
        <p>
          Вероятней всего, вы ещё не добавили пиццу в корзину.
          <br />
          Для того, чтобы выбрать пиццу, перейдите на главную страницу.
        </p>
        <img src={cartEmptyImage} alt="Пустая корзина" />
        <NavLink to="/" className="button button--black">
          <span>Вернуться назад</span>
        </NavLink>
      </div>
    </>
  );
}

export default CartEmpty;
