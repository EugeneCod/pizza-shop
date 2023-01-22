import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { addItem } from '../../reduxToolkit/cart/slice';
import { CartItem } from '../../reduxToolkit/cart/types';
import { selectCartItemById } from '../../reduxToolkit/cart/selectors';

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
};

const PizzaBlock: FC<PizzaBlockProps> = (props) => {
  const { id, title, price, imageUrl, types, sizes } = props;
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const addedCount = cartItem?.count || 0;
  const availableTypes = ['тонкое', 'традиционное'];
  const availableSizes = [26, 30, 40];

  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(sizes[0]);

  function handleSelectType(index: number) {
    setActiveType(index);
  }

  function handleSelectSize(size: number) {
    setActiveSize(size);
  }

  function handleAddClickButton() {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: availableTypes[activeType],
      size: activeSize,
    };
    dispatch(addItem(item));
  }

  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
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
          {}
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;
