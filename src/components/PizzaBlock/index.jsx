import { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function PizzaBlock(props) {
  const availableTypes = ['тонкое', 'традиционное'];
  const availableSizes = [26, 30, 40];
  const { title, price, imageUrl, types, sizes } = props;

  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [pizzasCount, setPizzasCount] = useState(0);

  function handleSelectType(index) {
    setActiveType(index);
  }

  function handleSelectSize(size) {
    setActiveSize(size);
  }

  function handleAddClickButton() {
    setPizzasCount((prev) => prev+= 1)
    console.log(pizzasCount);
  }

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types &&
            availableTypes.map((type, index) => (
              <li
                className={classNames({
                  active: activeType === index,
                  disabled: !types.includes(index),
                })}
                onClick={() => handleSelectType(index)}
                key={`${type}_${index}`}>
                {type}
              </li>
            ))}
        </ul>
        <ul>
          {sizes &&
            availableSizes.map((size, index) => (
              <li
                className={classNames({
                  active: activeSize === size,
                  disabled: !sizes.includes(size),
                })}
                onClick={() => handleSelectSize(size)}
                key={`${size}_${index}`}>
                {size} см.
              </li>
            ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button onClick={handleAddClickButton} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{pizzasCount}</i>
        </button>
      </div>
    </div>
  );
}

PizzaBlock.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number,
  imageUrl: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.number),
  sizes: PropTypes.arrayOf(PropTypes.number),
};

// Определение значений пропсов по-умолчанию
PizzaBlock.defaultProps = {
  name: '---',
  price: 0,
  imageUrl: 'ссылка по-умолчанию',
  types: [],
  sizes: [],
};

export default PizzaBlock;
