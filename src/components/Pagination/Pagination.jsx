import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

function Pagination({ onPageChange }) {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(obj) => {
        onPageChange(obj.selected + 1);
      }}
      pageRangeDisplayed={4}
      // из-за того, что mokapi не возвращает число потенциальных страниц, использован хардкод числа страниц
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
