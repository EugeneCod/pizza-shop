import { useEffect, FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';

import styles from './FullPizza.module.scss';
import { Button } from '../../components';
import { PIZZAOPTIONS } from '../../utils/constants';
import { Pizza } from '../../reduxToolkit/pizzas/types';

const FullPizza: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = useState<Pizza>();
  const [activeType, setActiveType] = useState(pizza?.types[0] || 0);
  const [activeSize, setActiveSize] = useState(pizza?.sizes[0] || 0);

  const {TYPES, SIZES} = PIZZAOPTIONS;

  function hangleClickButtonBack() {
    navigate(-1);
  }

  function handleSelectType(index: number) {
    setActiveType(index);
  }

  function handleSelectSize(size: number) {
    setActiveSize(size);
  }

  useEffect(() => {
    const getPizza = async () => {
      try {
        const pizzaResponse = await axios.get('https://63b939b56f4d5660c6e81059.mockapi.io/items/' + id);
        setPizza(pizzaResponse.data)
      } catch (error) {
        console.log(error);
        alert('Ошибка при получении данных с удаленного сервера. Пожалуйста, повторите попытку позже.');
        navigate('/');
      }
    }
    getPizza();
  }, [])

  if (!pizza) {
    return <div>Загрузка...</div>
  }

  return (
    <div className={styles.root}>
      <img className={styles.image} src={pizza.imageUrl} alt='' />
      <div className={styles.propertiesContainer}>
        <h2 className={styles.name}>{pizza.title}</h2>
        <p className={styles.description}>{pizza.description}</p>
        <div className="pizza-block__selector">
        <ul>
          {pizza.types &&
            TYPES.map((type, index) => (
              <li
                className={classNames({
                  active: activeType === index,
                  disabled: !pizza.types.includes(index),
                })}
                onClick={() => handleSelectType(index)}
                key={`${type}_${index}`}>
                {type}
              </li>
            ))}
        </ul>
        <ul>
          {pizza.sizes &&
            SIZES.map((size, index) => (
              <li
                className={classNames({
                  active: activeSize === size,
                  disabled: !pizza.sizes.includes(size),
                })}
                onClick={() => handleSelectSize(size)}
                key={`${size}_${index}`}>
                {size} см.
              </li>
            ))}
        </ul>
        <p className={styles.price}>{pizza.price} ₽</p>
      </div>
      </div>
      <Button black className={styles.buttonBack} onClick={hangleClickButtonBack}><span>Вернуться назад</span></Button>
      {/* <NavLink to="/" className="button button--black">
        <span>На главную</span>
      </NavLink> */}
    </div>
  )
}

export default FullPizza