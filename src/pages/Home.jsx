import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, PizzaBlock, SortPopup } from '../components';
import { setCategory } from '../reduxToolkit/filters';

const categories = ['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'alfabet' },
];

function Home() {
  const pizzas = useSelector(({ pizzas }) => pizzas.items);
  const dispatch = useDispatch();

  const selectCategory = useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  const selectSorting = useCallback((index) => {
    dispatch(setCategory(index));
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickItem={selectCategory} items={categories} />
        <SortPopup onClickItem={(name) => console.log(name)} items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas && pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
}

export default Home;
