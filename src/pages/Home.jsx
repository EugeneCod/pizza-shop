import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, PizzaBlock, SortPopup, Skeleton } from '../components';
import { setCategory } from '../reduxToolkit/filters';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'alfabet' },
];

function Home(props) {
  const { isLoading } = props;
  const pizzas = useSelector(({ pizzas }) => pizzas.items);
  const dispatch = useDispatch();

  const selectCategory = useCallback(
    (index) => {
      dispatch(setCategory(index));
    },
    [dispatch],
  );

  // const selectSorting = useCallback((index) => {
  //   dispatch(setCategory(index));
  // }, []);

  return (
    <>
      <div className="content__top">
        <Categories onClickItem={selectCategory} items={categories} />
        <SortPopup onClickItem={(name) => console.log(name)} items={sortItems} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading 
        ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
        :  pizzas && pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
        {/* {pizzas && pizzas.map((pizza) => isLoading ? <Skeleton /> : <PizzaBlock key={pizza.id} {...pizza} />)} */}
      </div>
    </>
  );
}

export default Home;
