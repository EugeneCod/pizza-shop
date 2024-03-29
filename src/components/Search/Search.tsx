import { useRef, useCallback, useState, FC, ChangeEvent } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../reduxToolkit/filter/slice';

const Search: FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((string: string) => {
      dispatch(setSearchValue(string));
    }, 1000),
    [],
  );

  function handleChangeInput(evt: ChangeEvent<HTMLInputElement>) {
    updateSearchValue(evt.target.value);
    setValue(evt.target.value);
  }

  function handleCLearInput() {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  }

  return (
    <div className={styles.root}>
      <svg
        className={styles.foundIcon}
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <title>Zoom 2</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="Page-2-Copy" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="35" stroke="#979797" fill="#95909E">
            <path
              d="M19.748841,21.1630546 L29.8137366,31.2279502 C30.2042454,31.618459 30.8346751,31.621169 31.2279221,31.2279221 C31.6184464,30.8373978 31.6135011,30.1992875 31.2279502,29.8137366 L21.1630546,19.748841 C22.9328431,17.6581587 24,14.9537033 24,12 C24,5.372583 18.627417,0 12,0 C5.372583,0 0,5.372583 0,12 C0,18.627417 5.372583,24 12,24 C14.9537033,24 17.6581587,22.9328431 19.748841,21.1630546 L19.748841,21.1630546 L19.748841,21.1630546 Z M2,12 C2,6.4771525 6.4771525,2 12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 L2,12 Z"
              id="Rectangle-404"
              stroke="none"></path>
          </g>
        </g>
      </svg>
      {value && (
        <svg
          onClick={() => {
            handleCLearInput();
          }}
          className={styles.clearIcon}
          fill="none"
          height="15"
          viewBox="0 0 15 15"
          width="15"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M1.5 1.5L13.5 13.5M1.5 13.5L13.5 1.5" stroke="black" />
        </svg>
      )}

      <input
        ref={inputRef}
        value={value}
        onChange={handleChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
    </div>
  );
};

export default Search;
