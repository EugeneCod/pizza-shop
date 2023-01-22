import { FC, memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSort, Sort, SortPropertyes } from '../reduxToolkit/slices/filterSlice';

type SortPopupProps = {
  selectedSort: Sort;
}

export const sortItems: Sort[] = [
  { name: 'популярности (убыв.)', sortProperty: SortPropertyes.RATING_DESC },
  { name: 'популярности (возр.)', sortProperty: SortPropertyes.RATING_ASC },
  { name: 'цене (убыв.)', sortProperty: SortPropertyes.PRICE_DESC },
  { name: 'цене (возр.)', sortProperty: SortPropertyes.PRICE_ASC },
  { name: 'алфавиту (убыв.)', sortProperty: SortPropertyes.TITLE_DESC },
  { name: 'алфавиту (возр.)', sortProperty: SortPropertyes.TITLE_ASC },
];

const SortPopup: FC<SortPopupProps> = memo((props) => {
  const { selectedSort } = props;
  const dispatch = useDispatch();
  const [visiblePopup, setVisiblePopup] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideCLick = (event: any): void => {
  
      if (sortRef.current && !event.path.includes(sortRef.current)) {
        setVisiblePopup(false);
      }
    }
    document.body.addEventListener('click', handleOutsideCLick);
    return () => {
      document.body.removeEventListener('click', handleOutsideCLick);
    };
  }, []);

  function toggleVisiblePopup() {
    setVisiblePopup(!visiblePopup);
  }

  

  const handleSelectSorting = (selectedSort: Sort) => {
    setVisiblePopup(false);
    dispatch(setSort(selectedSort));
  };

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          className={visiblePopup ? 'rotated' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={toggleVisiblePopup}>{selectedSort.name}</span>
      </div>
      {visiblePopup && (
        <div className="sort__popup">
          <ul>
            {sortItems &&
              sortItems.map((obj, index) => (
                <li
                  className={selectedSort.sortProperty === obj.sortProperty ? 'active' : ''}
                  onClick={() => handleSelectSorting(obj)}
                  key={`${obj.sortProperty}_${index}`}>
                  {obj.name}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
