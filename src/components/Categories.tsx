import { FC, memo } from 'react';
// import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  selectedItem: number;
  onClickItem: (index: number) => void;
}

const Categories: FC<CategoriesProps> = memo((props) => {
  // useWhyDidYouUpdate('Categories', props)
  const { onClickItem, selectedItem } = props;

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {
          categories.map((name, index) => (
            <li
              className={selectedItem === index ? 'active' : ''}
              onClick={() => onClickItem(index)}
              key={`${name}_${index}`}>
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
})

export default Categories;
