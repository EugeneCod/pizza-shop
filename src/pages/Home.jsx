import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, PizzaBlock, SortPopup, Skeleton } from '../components';
import { setCategory } from '../reduxToolkit/filters';
import { setPizzas } from '../reduxToolkit/pizzas';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];
const sortItems = [
  { name: 'популярности (убыв.)', sortProperty: 'rating' },
  { name: 'популярности (возр.)', sortProperty: '-rating' },
  { name: 'цене (убыв.)', sortProperty: 'price' },
  { name: 'цене (возр.)', sortProperty: '-price' },
  { name: 'алфавиту (убыв.)', sortProperty: 'title' },
  { name: 'алфавиту (возр.)', sortProperty: '-title' },
];

function Home() {
  const pizzas = useSelector(({ pizzas }) => pizzas.items);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState(sortItems[0]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const order = selectedSorting.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = selectedSorting.sortProperty.replace('-', '');
    const category = selectedCategory > 0 ? `category=${selectedCategory}` : '';

    window.scrollTo(0, 0);
    setIsLoading(true);
    axios
      .get(
        `https://63b939b56f4d5660c6e81059.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
      )
      .then(({ data }) => {
        dispatch(setPizzas(data));
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [selectedCategory, selectedSorting]);

  const handleSelectCategory = (index) => {
    setSelectedCategory(index);
    dispatch(setCategory(index));
  };

  const handleSelectSorting = (selectedSort) => {
    setSelectedSorting(selectedSort);
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickItem={handleSelectCategory}
          items={categories}
          selectedItem={selectedCategory}
        />
        <SortPopup
          onClickItem={handleSelectSorting}
          items={sortItems}
          selectedItem={selectedSorting}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
          : pizzas && pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
}

export default Home;
// сортировка по числовому значению категории от большей к меньшей (asc - наоборот)
// https://63b939b56f4d5660c6e81059.mockapi.io/items?sortBy=category&order=desc
// сортировка совмещенная с поиском
// https://63b939b56f4d5660c6e81059.mockapi.io/items?sortBy=category&order=desc&search=Пепперони&category=2
