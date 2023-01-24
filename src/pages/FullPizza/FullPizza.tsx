import { useEffect, FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import styles from './FullPizza.module.scss';
import { Button } from '../../components';

const FullPizza: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    description: string;
    price: number;
  }>();

  function hangleClickButtonBack() {
    navigate(-1);
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
        <p className={styles.price}>{pizza.price} ₽</p>
      </div>
      <Button black className={styles.buttonBack} onClick={hangleClickButtonBack}><span>Вернуться назад</span></Button>
      {/* <NavLink to="/" className="button button--black">
        <span>На главную</span>
      </NavLink> */}
    </div>
  )
}

export default FullPizza