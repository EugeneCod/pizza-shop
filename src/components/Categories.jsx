import React, { useState } from 'react';

function Categories({ items, onClickItem }) {
  const [activeItem, setActiveItem] = useState(null);

  function handleSelectItem(index) {
    setActiveItem(index);
    onClickItem(index);
  }

  return (
    <div className="categories">
      <ul>
        <li className={activeItem === null ? 'active' : ''} onClick={() => handleSelectItem(null)}>
          Все
        </li>
        {items &&
          items.map((name, index) => (
            <li
              className={activeItem === index ? 'active' : ''}
              onClick={() => handleSelectItem(index)}
              key={`${name}_${index}`}>
              {name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Categories;
