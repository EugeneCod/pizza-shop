import { Categories, PizzaBlock, SortPopup } from '../components';

function Home({ pizzas }) {
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClick={(name) => console.log(name)}
          items={['Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые']}
        />
        <SortPopup
          onClick={(name) => console.log(name)}
          items={['популярности', 'цене', 'алфавиту']}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
        }
      </div>
    </div>
  );
}

export default Home;
