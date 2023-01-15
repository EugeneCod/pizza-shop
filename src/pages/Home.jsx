import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';

import { Categories, PizzaBlock, SortPopup, Skeleton, Pagination } from '../components';
import { sortItems } from '../components/SortPopup';
import { setCategoryId, setCurrentPage, setFilters } from '../reduxToolkit/slices/filterSlice';
import { setPizzas } from '../reduxToolkit/slices/pizzasSlice';
import { AppContext } from '../context';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const [isLoading, setIsLoading] = useState(false);
  const { searchValue } = useContext(AppContext);
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const pizzas = useSelector(({ pizzas }) => pizzas.items);
  

  const handleSelectCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const handleSwitchPagination = (pageNumber) => {
    console.log(pageNumber);
    dispatch(setCurrentPage(pageNumber));
  };

  const fetchPizzas = () => {
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
  };

  // поиск по локальному массиву
  // const renderedPizzas = pizzas && pizzas.filter(obj => {
  //   if (obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())) {return true}
  //   return false;
  // }).map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  // Если был первый рендер, то проверяются URL-параметры и сохраняются в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortItems.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // Если происходит уже не первый рендер, то параметры фильтрации вшиваются в URL
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current || isMounted.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const renderedPizzas = pizzas && pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(9)].map((_, index) => <Skeleton key={index} />);

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
