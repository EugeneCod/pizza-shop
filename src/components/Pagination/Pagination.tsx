import { FC } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  onPageChange: (page: number) => void;
  currentPage: number;
}

const Pagination: FC<PaginationProps> = ({ onPageChange, currentPage }) => {
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
      forcePage={currentPage - 1}
    />
  );
}

export default Pagination;
