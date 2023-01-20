import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';

import { Categories, PizzaBlock, SortPopup, Skeleton, Pagination } from '../components';
import { sortItems } from '../components/SortPopup';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../reduxToolkit/slices/filterSlice';
import { fetchPizzas, selectPizzasData } from '../reduxToolkit/slices/pizzasSlice';

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzasData);

  const handleSelectCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const handleSwitchPagination = (pageNumber) => {
    console.log(pageNumber);
    dispatch(setCurrentPage(pageNumber));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    // Mokapi может предоставить некорректные данные при использовании поиска совмещенного с сортировкой.
    // Приоритет отдается сортировке, поэтому могут быть получены данные, не соответствующие строке, введенной в форму поиска.
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      }),
    );
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
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const renderedPizzas =
    items &&
    items.map((pizza) => (
      <PizzaBlock key={pizza.id} {...pizza} />
    ));
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
      {status === 'error' ? (
        <div className="content__error-container">
          <h2 className="content__error-title">Данные с удаленного сервера не были получены 😕</h2>
          <p className="content__error-description">
            Приносим искренние извинения. Мы делаем всё возможное, чтобы как можно скорее
            возобновить работу.
          </p>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">{status === 'loading' ? skeletons : renderedPizzas}</div>
        </>
      )}
      <Pagination currentPage={currentPage} onPageChange={handleSwitchPagination} />
    </div>
  );
}

export default Home;
// сортировка по числовому значению категории от большей к меньшей (asc - наоборот)
// https://63b939b56f4d5660c6e81059.mockapi.io/items?sortBy=category&order=desc
// сортировка совмещенная с поиском
// https://63b939b56f4d5660c6e81059.mockapi.io/items?sortBy=category&order=desc&search=Пепперони&category=2
