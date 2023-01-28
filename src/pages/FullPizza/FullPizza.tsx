import { useEffect, FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';

import styles from './FullPizza.module.scss';
import { Button } from '../../components';
import { PIZZAOPTIONS } from '../../utils/constants';
import { Pizza } from '../../reduxToolkit/pizzas/types';
import { CartItem } from '../../reduxToolkit/cart/types';
import { addItem } from '../../reduxToolkit/cart/slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemsById } from '../../reduxToolkit/cart/selectors';

interface Params {
  id: string;
}

const FullPizza: FC = () => {
  const { TYPES, SIZES } = PIZZAOPTIONS;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<keyof Params>() as Params;
  const [pizza, setPizza] = useState<Pizza>();
  const [activeType, setActiveType] = useState(pizza?.types[0] || 0);
  const [activeSize, setActiveSize] = useState(pizza?.sizes[0] || SIZES[0]);
  // const [cartItems, setCartItems] =  useState<CartItem[]>();
  const [addedCount, setAddedCount] = useState<number>(0);
  const cartItems = useSelector(selectCartItemsById(id));
  console.log(addedCount);

  // const addedCount = cartItem?.count || 0;
  // const addedCount = calcItemsCount(cartItems);

  function hangleClickButtonBack() {
    navigate(-1);
  }

  function handleSelectType(index: number) {
    setActiveType(index);
  }

  function handleSelectSize(size: number) {
    setActiveSize(size);
  }

  function calcItemsCount(items: CartItem[]): number {
    const count: number = items.reduce((sum, cartItem) => {
      if (!cartItem.count) {
        return sum;
      }
      return sum + cartItem.count;
    }, 0);
    return count || 0;
  }

  function handleAddPizza() {
    if (pizza) {
      const item: CartItem = {
        id: pizza.id,
        title: pizza.title,
        price: pizza.price,
        imageUrl: pizza.imageUrl,
        type: TYPES[activeType],
        size: activeSize,
      };
      dispatch(addItem(item));
      setAddedCount((prev) => (prev += 1));
    }
  }

  useEffect(() => {
    const getPizza = async () => {
      try {
        const pizzaResponse = await axios.get(
          'https://63b939b56f4d5660c6e81059.mockapi.io/items/' + id,
        );
        setPizza(pizzaResponse.data);
        setAddedCount(calcItemsCount(cartItems));
        setActiveType(pizzaResponse.data.types[0]);
        setActiveSize(pizzaResponse.data.sizes[0]);
      } catch (error) {
        console.log(error);
        alert(
          'Ошибка при получении данных с удаленного сервера. Пожалуйста, повторите попытку позже.',
        );
        navigate('/');
      }
    };
    getPizza();
  }, []);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.root}>
      <img className={styles.image} src={pizza.imageUrl} alt="" />
      <div className={styles.propertiesContainer}>
        <h2 className={styles.name}>{pizza.title}</h2>
        <p className={styles.description}>{pizza.description}</p>
        <div className={styles.sortContainer}>
          <ul className={styles.sortList}>
            {pizza.types &&
              TYPES.map((type, index) => (
                <li
                  className={classNames(styles.sortItem, {
                    [styles.sortItemActive]: activeType === index,
                    [styles.sortItemDisabled]: !pizza.types.includes(index),
                  })}
                  onClick={() => handleSelectType(index)}
                  key={`${type}_${index}`}>
                  {type}
                </li>
              ))}
          </ul>
          <ul className={styles.sortList}>
            {pizza.sizes &&
              SIZES.map((size, index) => (
                <li
                  className={classNames(styles.sortItem, {
                    [styles.sortItemActive]: activeSize === size,
                    [styles.sortItemDisabled]: !pizza.sizes.includes(size),
                  })}
                  onClick={() => handleSelectSize(size)}
                  key={`${size}_${index}`}>
                  {size} см.
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.bottomContainer}>
          <p className={styles.price}>{pizza.price} ₽</p>
          <button onClick={handleAddPizza} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {}
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
      <Button black className={styles.buttonBack} onClick={hangleClickButtonBack}>
        <span>Вернуться назад</span>
      </Button>
    </div>
  );
};

export default FullPizza;
