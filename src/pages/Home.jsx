import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { Categories, PizzaBlock, SortPopup, Skeleton, Pagination } from '../components';
import { setCategoryId, setCurrentPage } from '../reduxToolkit/slices/filterSlice';
import { setPizzas } from '../reduxToolkit/slices/pizzasSlice';
import { AppContext } from '../context';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

function Home() {
  const { searchValue } = useContext(AppContext);
  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const pizzas = useSelector(({ pizzas }) => pizzas.items);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);

  const skeletons = [...new Array(9)].map((_, index) => <Skeleton key={index} />);
  const renderedPizzas = pizzas && pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  // поиск по локальному массиву
  // const renderedPizzas = pizzas && pizzas.filter(obj => {
  //   if (obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {return true}
  //   return false;
  // }).map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  useEffect(() => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    // Mokapi может предоставить некорректные данные при использовании поиска совмещенного с сортировкой.
    // Приоритет отдается сортировке, поэтому могут быть получены данные, не соответствующие строке, введенной в форму поиска.
    const search = searchValue ? `&search=${searchValue}` : '';

    setIsLoading(true);
    axios
      .get(
        `https://63b939b56f4d5660c6e81059.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then(({ data }) => {
        dispatch(setPizzas(data));
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const handleSwitchPagination = (pageNumber) => {
    console.log(pageNumber);
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickItem={handleSelectCategory}
          items={categories}
          selectedItem={categoryId}
        />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : renderedPizzas}</div>
      <Pagination currentPage={currentPage} onPageChange={handleSwitchPagination} />
    </div>
  );
}

export default Home;
// сортировка по числовому значению категории от большей к меньшей (asc - наоборот)
// https://63b939b56f4d5660c6e81059.mockapi.io/items?sortBy=category&order=desc
// сортировка совмещенная с поиском
// https://63b939b56f4d5660c6e81059.mockapi.io/items?sortBy=category&order=desc&search=Пепперони&category=2
