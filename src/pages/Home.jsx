import { useSelector } from 'react-redux';
import { Categories, PizzaBlock, SortPopup } from '../components';

function Home() {
  const { pizzas } = useSelector(({ pizzas, filters }) => {
    return {
      pizzas: pizzas.items,
      sortBy: filters.sortBy,
    }
  });

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickItem={(index) => console.log(index)}
          items={['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']}
        />
        <SortPopup
          onClick={(name) => console.log(name)}
          items={[
            { name: 'популярности', type: 'popular' },
            { name: 'цене', type: 'price' },
            { name: 'алфавиту', type: 'alfabet' },
          ]}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {pizzas && pizzas.map((pizza) => (
          <PizzaBlock key={pizza.id} {...pizza} />
        ))}
      </div>
    </div>
  );
}

export default Home;
