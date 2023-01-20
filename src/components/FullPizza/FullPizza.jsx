import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './FullPizza.module.scss';
import { useState } from 'react';

function FullPizza() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = useState({});

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

  useEffect(() => {
    getPizza();
  }, [])

  if (!pizza.title) {
    return <div>Загрузка...</div>
  }

  return (
    <div className={styles.root}>
      <img className={styles.image} src={pizza?.imageUrl} alt='' />
      <h2 className={styles.name}>{pizza?.title}</h2>
      <p className={styles.description}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente suscipit iste possimus architecto maiores sequi omnis veritatis quae beatae repudiandae.
      </p>
      <p className={styles.price}>{pizza?.price} ₽</p>
    </div>
  )
}

export default FullPizza