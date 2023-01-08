import React, { memo } from 'react';

const Categories = memo(function Categories(props) {
  const { items, onClickItem, selectedItem } = props;

  return (
    <div className="categories">
      <ul>
        {items &&
          items.map((name, index) => (
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
});

export default Categories;
